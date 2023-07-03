/** @type {import('next').NextConfig} **/
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
				hostname: "e0.pxfuel.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
