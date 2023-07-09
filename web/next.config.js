/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.kinja-img.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.pixabay.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "media.tenor.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
