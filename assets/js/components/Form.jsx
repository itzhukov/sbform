import ReactDOM from "react-dom"
import React from "react"
import styles from 'form';

export default class Form extends React.Component {
	constructor() {
		super();
		this.state = {
			cardNumber: '',
			expToMonth: '',
			expToYear: '',
			userName: '',
			CCV: '',
			isErrorForm: false,
			isSuccessForm: false,
			errors: []
		}
	}

	validateForm(event) {
		event.preventDefault();
		event.stopPropagation();

		let errors = [];

		if (
			!this.actionValidateCardNumber() ||
			!this.actionValidateDate() ||
			!this.actionValidateName() ||
			!this.actionValidateCCV()
		) {
			errors.push('— Вы ошиблись в реквизитах карты');
			errors.push('— На карте нулевой балланс или она заблокирована.');
			errors.push('Проверьте реквизиты или укажите данные другой карты.');
		}

		this.setState({
			isErrorForm: (errors.length) ? true : false,
			isSuccessForm: (errors.length) ? false : true,
			errors: errors,
		});
	}

	// Luhn Algorithm
	actionValidateCardNumber() {
		let cardNumber = this.state.cardNumber;

		if (/[^0-9-\s]+/.test(cardNumber) || cardNumber.length < 16) return false;

		var nCheck = 0, nDigit = 0, bEven = false;
		cardNumber = cardNumber.replace(/\D/g, "");

		for (var n = cardNumber.length - 1; n >= 0; n--) {
			var cDigit = cardNumber.charAt(n),
				nDigit = parseInt(cDigit, 10);

			if (bEven) {
				if ((nDigit *= 2) > 9) nDigit -= 9;
			}

			nCheck += nDigit;
			bEven = !bEven;
		}

		return (nCheck % 10) == 0;
	}

	actionValidateName() {
		let userName = this.state.userName;
		return (userName.length) ? true : false
	}

	actionValidateDate() {
		let expToMonth = this.state.expToMonth;
		let expToYear = this.state.expToYear;
		return (expToMonth.length == 2 && expToYear.length == 2 ) ? true : false
	}

	actionValidateCCV() {
		let CCV = this.state.CCV;
		return (CCV.length == 3) ? true : false
	}

	actionSetInputValue(event) {
		let name = event.target.name;
		let value = event.target.value;
		let valueLen = value.length;

		switch(name){
			case 'cardNumber':
				if (!/^[0-9-\s]{0,20}$/.test(value) || valueLen >= 20) {
					return false;
				}
				break;
			case 'expToMonth':
				if (!/^([0-1]|0[1-9]|1[0-2]){0,2}$/.test(value) || valueLen >= 3) {
					return false;
				}
				break;
			case 'expToYear':
				if (!/^([0-9]|[0-9][0-9]){0,2}$/.test(value) || valueLen >= 3) {
				return false;
				}
				break;
			case 'userName':
				value = value.toUpperCase();
				break;
			case 'CCV':
				if (!/^([0-9]{0,3})$/.test(value) || valueLen >= 4) {
				return false;
				}
				break;
		}

		this.setState({
			[name]: value
		});
	}

	render (){
		let isErrorForm = this.state.isErrorForm;

		return (
			<form className={(isErrorForm) ? styles.root__errors: styles.root}>
				<div className={styles.header}>Пожалуйста, введите данные Вашей банковской карты.</div>
				{
					(isErrorForm)
					?
						<div className={styles.errors}>
							<div className={styles.error}>Ошибка! Возможно:</div>
							{
								this.state.errors.map( (item, i) => {
									return <div key={i} className={styles.error}>{item}</div>
								})
							}
						</div>
					: null
				}

				<div className={styles.group}>
					<label className={styles.label} htmlFor="cardNumber">Номер карты</label>
					
					<div className={styles.col}>
						<input
							type="text"
							id="cardNumber"
							name="cardNumber"
							placeholder="1111-2222-3333-4444"
							onChange={this.actionSetInputValue.bind(this)}
							value={this.state.cardNumber}
							className={styles.input__cardNumber}/>

						<img src="./img/visa.png" width="37" alt="" className={styles.visa}/>
					</div>
				</div>

				<div className={styles.group}>
					<label className={styles.label} htmlFor="expToMonth">Действует до</label>
					
					<div className={styles.col}>
						<input
							type="text"
							id="expToMonth"
							name="expToMonth"
							placeholder="MM"
							onChange={this.actionSetInputValue.bind(this)}
							value={this.state.expToMonth}
							className={styles.input__month}/>

						{<span className={styles.date_divider}>/</span>}

						<input
							type="text"
							id="expToYear"
							name="expToYear"
							placeholder="YY"
							onChange={this.actionSetInputValue.bind(this)}
							value={this.state.expToYear}
							className={styles.input__year}/>
					</div>
				</div>

				<div className={styles.group}>
					<label className={styles.label} htmlFor="userName">Имя и фамилия</label>

					<div className={styles.col}>
						<input
							type="text"
							id="userName"
							name="userName"
							placeholder="IVAN IVANOV"
							onChange={this.actionSetInputValue.bind(this)}
							value={this.state.userName}
							className={styles.input}/>

						<div className={styles.hint}>Латинские буквы, как на карте</div>
					</div>
				</div>

				<div className={styles.group}>
					<label className={styles.label} htmlFor="CCV">Код CCV</label>
					
					<div className={styles.col}>
						<input
							type="password"
							id="CCV"
							name="CCV"
							placeholder="***"
							onChange={this.actionSetInputValue.bind(this)}
							value={this.state.CCV}
							className={styles.input__ccv}/>

						<div className={styles.hint}>Три цифры с обратной стороны карты</div>
						{
							(this.state.isSuccessForm)
							?
								<button
									type="button"
									className={styles.button_success}
									onClick={this.validateForm.bind(this)}>
									Подтверждено
								</button>
							:
							<button
								type="button"
								className={styles.button}
								onClick={this.validateForm.bind(this)}>
								Подтвердить
							</button>
						}
					</div>
				</div>

			</form>
		);
	}
}