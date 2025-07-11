import Information from "@/ui/Information";
import ModalFormGrid from "@/ui/ModalFormGrid";

interface OrderDetailsInfoProps {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  code: string;
  country: string;
  userPhoto: string;
}

export default function OrderDetailsInfo({
  name,
  phone,
  email,
  address,
  city,
  code,
  country,
  userPhoto,
}: OrderDetailsInfoProps) {
  const orderDetails = [
    { text: "City", value: city },
    { text: "Code", value: code },
    { text: "Country", value: country },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-8 md:gap-5">
        <div className="flexCenter sm:col-span-4">
          <img
            loading="lazy"
            src={userPhoto}
            alt={name}
            className="size-60 max-h-full max-w-full rounded-full object-cover object-center sm:size-72"
          />
        </div>
        <div className="flex flex-col gap-3.5 sm:col-span-4 md:gap-5">
          <Information text="Name" value={name} />
          <Information text="Phone" value={phone} />
          <Information text="Email" value={email} />
          <Information text="Address" value={address} />
        </div>
      </div>
      <ModalFormGrid>
        {orderDetails?.map(({ text, value }, index) => (
          <Information key={index} text={text} value={value} />
        ))}
      </ModalFormGrid>
    </>
  );
}
