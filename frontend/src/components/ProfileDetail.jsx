import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setProfileDetail } from "../redux/slices/conditionSlice";
import { toast } from "react-toastify";
// import axios from "axios";

const ProfileDetail = () => {
	const dispatch = useDispatch();
	const token = localStorage.getItem("token");
	const user = useSelector((store) => store.auth);

	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [image, setImage] = useState(user.image);
	const [loading, setLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Base64 image string
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      image, // base64
    });

    try {
		// console.log("Token:", token);
		// const token=localStorage.getItem("token",token);
      const res = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Profile updated successfully");
		
		window.location.reload();
        // console.log(data);
      } else {
        toast.error(`❌ Failed: ${data.message || "Something went wrong"}`);
        console.error(data);
		setLoading(false);
      }
    } catch (err) {
      console.error(err);
       toast.error("❌ Server error");
	   setLoading(false);
    }
  };

	return (
		<div className="flex -m-2 sm:-m-4 flex-col items-center my-6 text-slate-300 min-h-screen w-full fixed top-0 justify-center z-50">
			<div className="p-3 pt-4 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-800 rounded-lg h-fit mt-5 transition-all relative">
				<h2 className="text-2xl underline underline-offset-8 font-semibold text-slate-100 w-full text-center mb-2">
					Profile
				</h2>

				<div className="w-full py-4 justify-evenly flex flex-wrap items-center gap-3">
					<div className="self-end w-full sm:w-auto">
						{isEditing ? (
							<>
								<input
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="bg-slate-700 text-white p-2 mb-2 rounded w-full"
									placeholder="First Name"
								/>
								<input
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="bg-slate-700 text-white p-2 mb-2 rounded w-full"
									placeholder="Last Name"
								/>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="bg-slate-700 text-white p-2 mb-2 rounded w-full"
									placeholder="Email"
								/>
							</>
						) : (
							<>
								<h3 className="text-xl font-semibold p-1">
									Name: {firstName} {lastName}
								</h3>
								<h3 className="text-xl font-semibold p-1">Email: {email}</h3>
							</>
						)}

						<button
							onClick={() => {
								localStorage.removeItem("token");
								window.location.reload();
							}}
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded mt-3 hidden sm:block"
						>
							Logout
						</button>
					</div>

					<div className="self-end flex w-full sm:w-fit items-center justify-evenly sm:flex-col">
						<img
							src={image}
							alt="user"
							className="w-20 h-20 rounded-md object-cover"
						/>
						{isEditing && (
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className="mt-2 text-white"
							/>
						)}
						<div className="flex flex-col">
							{isEditing ? (
								<>
									<button
										onClick={handleSave}
										className="bg-green-700 hover:bg-green-800 text-white font-bold py-1.5 px-4 rounded sm:mt-3 disabled:opacity-50"
										disabled={loading}
									>
										{loading ? "Saving..." : "Save"}
									</button>
									<button
										onClick={() => setIsEditing(false)}
										className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1.5 px-4 rounded mt-2"
									>
										Cancel
									</button>
								</>
							) : (
								<button
									onClick={() => setIsEditing(true)}
									className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1.5 px-4 rounded sm:mt-3"
								>
									Update
								</button>
							)}
							<button
								onClick={() => {
									localStorage.removeItem("token");
									window.location.reload();
								}}
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded mt-3 sm:hidden"
							>
								Logout
							</button>
						</div>
					</div>
				</div>

				<div
					title="Close"
					onClick={() => dispatch(setProfileDetail())}
					className="bg-black/15 hover:bg-black/50 h-7 w-7 rounded-md flex items-center justify-center absolute top-2 right-3 cursor-pointer"
				>
					<MdOutlineClose size={22} />
				</div>
			</div>
		</div>
	);
};

export default ProfileDetail;
