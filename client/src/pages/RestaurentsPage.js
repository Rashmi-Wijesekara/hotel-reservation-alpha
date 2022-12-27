import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Restaurents__connection from "../connections/Restaurents"
import SelectMeal from "../components/booking-progress/SelectMeal";
import Search from "../components/rooms/Search";
import CardContainer from "../components/cards/CardContainer";

const RestaurentsPage = () => {
	const [formData, setFormData] = useState({
		type: "4",
		checkin: "",
		checkout: "",
		guests: "",
	});

	const [selectedTags, setSelectedTags] = useState([]);
	const [searchResult, setSearchResult] =
		useState([]);
	const [bookStatus, setBookStatus] = useState(false);
	const [item, setItem] = useState([]);
	const [tags, setTags] = useState([]);
	const [bookHide, setBookHide] = useState(true);

	const searchHandler = async () => {
		console.log(selectedTags);
		// parse the selected tags to the backend

		const data = await Restaurents__connection.filterRestaurents(selectedTags)
		setSearchResult(data)
	};

	let redirect;
	const bookClickHandler = (item) => {
		setItem(item);
		setFormData({ ...formData, item });
		setBookStatus(true);
	};

	useEffect(() => {
		async function getAllRoomsTags() {
			const data =
				await Restaurents__connection.getAllTags();
			await setTags(data);
		}

		async function getAllRestaurents() {
			const data =
				await Restaurents__connection.getAllRestaurents();
			await setSearchResult(data);
		}

		getAllRoomsTags();
		getAllRestaurents();
	}, []);

	return (
		<>
			{bookStatus && (
				<Navigate
					to="/booking-process"
					state={{
						page: 3,
						formData: formData,
						backHide: true,
					}}
					replace={false}
				/>
			)}
			<div className="relative top-16 bg-[#E2E8F0] min-h-[calc(100vh-10rem)]">
				<div className="ml-10 font-poppins text-xl font-bold text-textBlue py-4">
					Restaurents
				</div>
				<div className="flex flex-col md:flex-row items-start">
					<Search
						tags={tags}
						selectedTags={selectedTags}
						setSelectedTags={setSelectedTags}
						onClick={() => searchHandler()}
					/>

					<div className="pl-5">
						<SelectMeal
							formData={formData}
							setFormData={setFormData}
						/>

						<div className="flex flex-wrap justify-left gap-y-6 gap-x-2 mx-5 my-5">
							{searchResult.map((item) => (
								<CardContainer
									title={item.name}
									image={item.image}
									price={item.price}
									stars={item.stars}
									description={item.description}
									bookClickHandler={bookClickHandler}
									item={item}
									hideBookBtn={bookHide}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default RestaurentsPage