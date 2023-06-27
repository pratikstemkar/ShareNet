import Image from "next/image";

const Page = () => {
	return (
		<main className="flex flex-col justify-center items-center">
			<Image src="404.svg" alt="404" height={500} width={500} />
			<span>Not found. Heh!</span>
		</main>
	);
};

export default Page;
