import React from "react";
import { Link } from "react-router-dom";
import Input from "../dashboard/InputField";

const SummaryContainer = (props) => {
	const paidHandler = () => {
		console.log("should print")
		// sessionStorage.setItem(
		// 	"loginStatus", true
		// );
		window.open("/print", "_blank", 'height=full')
		// window.print();
	};

	const additionalHandler = ()=> {}

	const checkinHandler = () => {};

	const checkoutHandler = () => {};

	return (
		<div className="bg-white drop-shadow-2xl rounded-xl p-3 text-xs">
			<Input
				title="Room Type"
				id="roomtype"
				type="text"
				value={props.item.room}
			/>
			<Input
				title="Check-in"
				id="checkin"
				type="text"
				value={props.item.checkin}
			/>
			<Input
				title="Check-out"
				id="checkout"
				type="text"
				value={props.item.checkout}
			/>
			<Input
				title="No. of Guests"
				id="guests"
				type="number"
				value={props.item.guests}
			/>
			<Input
				title="No. of Rooms"
				id="roomCount"
				type="number"
				value={props.item.roomCount}
			/>
			<Input
				title="Price"
				id="price"
				type="text"
				value={props.item.price}
			/>

			{!props.checkout && (
				<div className="flex flex-row items-center justify-evenly my-3">
					{/* <Link
						to="/print"
						// state={{data: props.item}}
						target="_blank"
						rel="noopener noreferrer"
					> */}
						<button
							onClick={paidHandler}
							className="bg-textBlue text-white font-bold text-base px-6 py-1"
						>
							Paid
						</button>
					{/* </Link> */}
					<button
						onClick={checkinHandler}
						className="bg-textBlue text-white font-bold text-base px-6 py-1"
					>
						Check-in
					</button>
				</div>
			)}

			{props.checkout && (
				<div className="flex flex-row items-center justify-evenly my-3">
					<button
						onClick={additionalHandler}
						className="bg-textBlue text-white font-bold text-base px-6 py-1"
					>
						Additional
					</button>
					<button
						onClick={checkoutHandler}
						className="bg-textBlue text-white font-bold text-base px-6 py-1"
					>
						Check-out
					</button>
				</div>
			)}
		</div>
	);
};

export default SummaryContainer;
