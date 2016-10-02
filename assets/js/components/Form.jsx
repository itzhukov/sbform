import ReactDOM from "react-dom"
import React from "react"

export default class Form extends React.Component {
	constructor() {
		super();
		this.state = {
			cardNumber: '',
			expToMonth: '',
			expToYear: '',
			userName: '',
			CCV: '',
			CCV: '',
			isErrorForm: false,
			errors: []
		}
	}

	validateForm(event) {
		event.preventDefault();
		event.stopPropagation();

		let errors = [];

		if ( !this.actionValidateCardNumber() ) {
			errors.push('— Вы ошиблись в реквизитах карты');
			errors.push('— На карте нулевой балланс или она заблокирована.');
			errors.push('Проверьте реквизиты или укажите данные другой карты.');
		}

		this.setState({
			isErrorForm: (errors.length) ? true : false,
			errors: errors,
		});
	}

	componentWillReceiveProps(nextProps) {
		console.log('-> componentWillReceiveProps', nextProps);
	}

	// Luhn Algorithm
	actionValidateCardNumber() {
		let cardNumber = this.state.cardNumber;

		if (/[^0-9-\s]+/.test(cardNumber) || !cardNumber.length) return false;

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
				if (!/^([0-1]|0[1-9]|1[0-2])$/.test(value) || valueLen >= 3) {
					return false;
				}
				break;
			case 'expToYear':
				if (!/^([0-9]|[0-9][0-9])$/.test(value) || valueLen >= 3) {
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
			<form className={(isErrorForm) ? "Form Form--errors" : "Form"}>
				<div className="Form-header">Пожалуйста, введите данные Вашей банковской карты.</div>
				{
					(isErrorForm)
					?
						<div className="Form-errors">
							<div className="Form-error">Ошибка! Возможно:</div>
							{
								this.state.errors.map( (item, i) => {
									return <div key={i} className="Form-error">{item}</div>
								})
							}
						</div>
					: null
				}

				<div className="Form-group">
					<label className="Form-label" htmlFor="cardNumber">Номер карты</label>
					
					<div className="Form-col">
						<input
							type="text"
							id="cardNumber"
							name="cardNumber"
							placeholder="1111-2222-3333-4444"
							onChange={this.actionSetInputValue.bind(this)}
							value={this.state.cardNumber}
							className="Form-input Form-input--cardNumber"/>

						<img src="./img/visa.png" width="37" alt="" className="Form-visa"/>
					</div>
				</div>

				<div className="Form-group">
					<label className="Form-label" htmlFor="expToMonth">Действует до</label>
					
					<div className="Form-col">
						<input
							type="number"
							id="expToMonth"
							name="expToMonth"
							placeholder="MM"
							onChange={this.actionSetInputValue.bind(this)}
							value={this.state.expToMonth}
							className="Form-input Form-input--month"/>

						{<span className="Form-date-divider">/</span>}

						<input
							type="number"
							id="expToYear"
							name="expToYear"
							placeholder="YY"
							onChange={this.actionSetInputValue.bind(this)}
							value={this.state.expToYear}
							className="Form-input Form-input--year"/>
					</div>
				</div>

				<div className="Form-group">
					<label className="Form-label" htmlFor="userName">Имя и фамилия</label>

					<div className="Form-col">
						<input
							type="text"
							id="userName"
							name="userName"
							placeholder="IVAN IVANOV"
							onChange={this.actionSetInputValue.bind(this)}
							value={this.state.userName}
							className="Form-input"/>

						<div className="Form-hint">Латинские буквы, как на карте</div>
					</div>
				</div>

				<div className="Form-group">
					<label className="Form-label" htmlFor="CCV">Код CCV</label>
					
					<div className="Form-col">
						<input
							type="password"
							id="CCV"
							name="CCV"
							placeholder="***"
							onChange={this.actionSetInputValue.bind(this)}
							value={this.state.CCV}
							className="Form-input Form-input--ccv"/>

						<div className="Form-hint">Три цифры с обратной стороны карты</div>

						<button
							type="button"
							className="Form-button App-button App-button--blue"
							onClick={this.validateForm.bind(this)}>
							Подтвердить
						</button>
					</div>
				</div>

			</form>
		);
	}
}