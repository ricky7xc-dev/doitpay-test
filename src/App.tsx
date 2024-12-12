import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { GrVisa } from "react-icons/gr";
import masterCard from "./assets/Mastercard-Logo.png";
import "./App.css";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { SketchPicker } from "react-color";
import DatePicker from "react-datepicker";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-datepicker/dist/react-datepicker.css";

interface CreditCard {
  name: string;
  number: string;
  expiry: string;
  color: string;
  limit: string;
}

function App() {
  const initialCards = [
    {
      id: 1,
      name: "John Doe",
      number: "**** **** **** 1234",
      expiry: "12/2025",
      type: "visa",
      color: "#ff0000",
      limit: "$5000",
    },
    {
      id: 2,
      name: "Jane Smith",
      number: "**** **** **** 5678",
      expiry: "05/2024",
      type: "mastercard",
      color: "#00ff00",
      limit: "$3000",
    },
    {
      id: 2,
      name: "Jane Smith",
      number: "**** **** **** 5678",
      expiry: "05/2024",
      type: "mastercard",
      color: "#00ff00",
      limit: "$3000",
    },
    {
      id: 2,
      name: "Jane Smith",
      number: "**** **** **** 5678",
      expiry: "05/2024",
      type: "mastercard",
      color: "#00ff00",
      limit: "$3000",
    },
  ];

  const [loop, setLoop] = useState<CreditCard[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [ccHolder, setCCHolder] = useState("");
  const [ccNumber, setCCNumber] = useState("");
  const [ccLimit, setCCLimit] = useState("");
  const [ccHex, setCCHex] = useState("#f17013");
  const [ccExpired, setCCExpired] = useState<Date>(new Date());
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [showCardDetailModal, setShowCardDetailModal] = useState(false);

  function handleCardClick(card: CreditCard) {
    setSelectedCard(card);
    setShowCardDetailModal(true);
  }

  function closeCardDetailModal() {
    setShowCardDetailModal(false);
    setSelectedCard(null);
  }

  function formatCardNumber(number: string): string {
    return number
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1-")
      .replace(/-$/, "");
  }

  function maskCardNumber(number: string): string {
    const cleanNumber = number.replace(/\D/g, "");
    return "**** **** **** " + cleanNumber.slice(-4);
  }

  useEffect(() => {
    setLoop(initialCards);
  }, []);

  function onCloseModal() {
    setOpenModal(false);
  }

  function handleAddCard() {
    const newCard: CreditCard = {
      name: ccHolder,
      number: ccNumber,
      expiry: ccExpired.toLocaleDateString("en-GB"),
      color: ccHex,
      limit: ccLimit,
    };
    setLoop((prevLoop) => [newCard, ...prevLoop]);
    // Reset form fields
    setCCHolder("");
    setCCNumber("");
    setCCLimit("");
    setCCExpired(new Date());
    setCCHex("#f17013");
    setShowColorPicker(false);
    onCloseModal();
  }

  console.log(loop);

  return (
    <>
      <div className="bg-gray-300 w-full h-screen p-8">
        <div className="flex flex-row justify-between pb-8">
          <div>Cards</div>
          <button className="text-red-700">View all {">"}</button>
        </div>
        <div className="flex flex-nowrap gap-4">
          <button
            onClick={() => setOpenModal(true)}
            className="flex-none w-full max-w-[250px] p-4 border border-gray-900 border-dotted rounded-xl place-items-center content-center"
          >
            <CiCirclePlus size={30} />
            <div className="text-md font-semibold">Add new Card</div>
          </button>
          <Swiper
            spaceBetween={10}
            pagination={{ clickable: true }}
            breakpoints={{
              "@0.00": { slidesPerView: 1, spaceBetween: 10 },
              "@0.75": { slidesPerView: 2, spaceBetween: 20 },
              "@1.00": { slidesPerView: 3, spaceBetween: 40 },
              "@1.50": { slidesPerView: 3, spaceBetween: 12 },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {loop.map((val, index) => (
              <SwiperSlide key={index}>
                <div
                  className="flex-none w-[350px] p-2 rounded-xl shadow-lg cursor-pointer"
                  style={{ backgroundColor: val.color }}
                  onClick={() => handleCardClick(val)}
                >
                  <div className="justify-between items-center mb-2">
                    <GrVisa size={30} className="text-white" />
                  </div>
                  <div className="text-white font-semibold text-lg mb-1">
                    {val.name}
                  </div>
                  <div className="text-white text-sm mb-2">
                    {maskCardNumber(val.number)}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <div className="text-white text-xs mb-1">Expiry</div>
                      <div className="text-white text-sm">
                        {val.expiry.split("/").slice(-2).join("/")}
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-md text-xs">
                      <img src={masterCard} alt="image" className="w-12" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-2xl font-bold mb-4">Add new card</div>
          <div className="mb-2 block">
            <div className="mb-2 block">
              <Label htmlFor="ccHolder" value="Credit Card Holder" />
            </div>
            <TextInput
              id="ccHolder"
              placeholder="Enter Card Holder"
              value={ccHolder}
              onChange={(event) => setCCHolder(event.target.value)}
              required
            />
          </div>
          <div className="mb-2 block">
            <div className="mb-2 block">
              <Label htmlFor="ccNumber" value="Credit Card Number" />
            </div>
            <TextInput
              id="ccNumber"
              placeholder="Enter Card Number"
              value={ccNumber}
              onChange={(event) =>
                setCCNumber(formatCardNumber(event.target.value))
              }
              maxLength={19}
              required
            />
          </div>
          <div className="mb-2 block">
            <div className="mb-2 block">
              <Label htmlFor="ccLimit" value="Credit Card Limit" />
            </div>
            <TextInput
              id="ccLimit"
              placeholder="Enter Credit Limit"
              value={ccLimit}
              onChange={(event) => setCCLimit(event.target.value)}
              required
            />
          </div>
          <div className="mb-2 block">
            {showColorPicker && (
              <div className="mb-4 absolute z-50">
                <SketchPicker
                  onChange={(color) => setCCHex(color.hex)}
                  color={ccHex}
                />

                <Button
                  size="sm"
                  color="light"
                  className="mt-2"
                  onClick={() => setShowColorPicker(false)}
                >
                  Choose
                </Button>
              </div>
            )}
            <div className="mb-2 block">
              <Label htmlFor="colorPicker" value="Credit Card Color" />
            </div>
            <div
              className="cursor-pointer border p-2 rounded-md mb-2"
              style={{ backgroundColor: ccHex }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              Click to choose color
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="ccHolder" value="Expired At" />
            </div>
            <DatePicker
              selected={ccExpired}
              onChange={(date) => setCCExpired(date!)}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className="border border-gray-600 rounded-lg"
            />
          </div>
          <div className="flex justify-end mt-4 gap-4">
            <Button size="md" color="light" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button size="md" color="purple" onClick={handleAddCard}>
              Add
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showCardDetailModal}
        size="md"
        onClose={closeCardDetailModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          {selectedCard && (
            <div>
              <div className="text-2xl font-bold mb-4">Card Details</div>
              <div className="mb-2">
                <Label value="Card Holder Name" />
                <div className="font-semibold">{selectedCard.name}</div>
              </div>
              <div className="mb-2">
                <Label value="Expired Date" />
                <div className="font-semibold">
                  {selectedCard.expiry.split("/").slice(-2).join("/")}
                </div>
              </div>
              <div className="mb-2">
                <Label value="Card Color" />
                <div
                  className="w-16 h-8 rounded-md"
                  style={{ backgroundColor: selectedCard.color }}
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button size="md" color="light" onClick={closeCardDetailModal}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
