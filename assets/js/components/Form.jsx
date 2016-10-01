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
			isErrorForm: false
		}
	}

	confirmForm(event) {
		console.log('-> confirmForm');

		event.preventDefault();
		event.stopPropagation();

		this.setState({
			isErrorForm: !this.state.isErrorForm
		});

	}

	actionSetInputValue(event) {
		let name = event.target.name;
		let value = event.target.value;

		this.setState({
			[name]: value
		});
	}

	render (){
		return (
			<form className="Form">
				<div className="Form-header">Пожалуйста, введите данные Вашей банковской карты.</div>
				{
					(this.state.isErrorForm)
					?
						<div className="Form-errors">
							<div className="Form-error">Ошибка! Возможно:</div>
							<div className="Form-error">— Вы ошиблись в реквизитах карты</div>
							<div className="Form-error">— На карте нулевой балланс или она заблокирована.</div>
							<div className="Form-error">Проверьте реквизиты или укажите данные другой карты.</div>
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
						<button type="button" className="Form-button App-button App-button--blue" onClick={this.confirmForm.bind(this)}>
							Подтвердить
						</button>
					</div>
				</div>

			</form>
		);
	}
}