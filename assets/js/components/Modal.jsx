import ReactDOM from "react-dom"
import React from "react"

export default class Modal extends React.Component {
	constructor() {
		super();
	}

	render (){
		return (
			<div className={ (this.props.isVisible == true) ? 'Modal  Modal--open' : 'Modal' }>
				<div className="ModalBg" onClick={this.props.toggleModal.bind(this)} />

				<div className="ModalContainer">
					<div className="ModalInner">
					<div className="Modal-header">
						<span className="Modal-header-name">{this.props.header}</span>
						<div className="Modal-close" onClick={this.props.toggleModal.bind(this)} />
					</div>

					<div className="Modal-body">
						{this.props.children}
					</div>
					</div>
				</div>

			</div>
		);
	}
}