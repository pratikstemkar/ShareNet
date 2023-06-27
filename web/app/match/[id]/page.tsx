import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
	title: "Ind vs Aus" + " - " + process.env.NEXT_PUBLIC_APP_NAME,
	description: "Cricket Ball by Ball Commentary",
};

const batters = [
	{
		batter: "Virat Kohli",
		runs: "76",
		balls: "78",
		fours: "3",
		sixes: "1",
		strike_rate: "45.09",
	},
	{
		batter: "Rohit Sharma",
		runs: "23",
		balls: "43",
		fours: "4",
		sixes: "10",
		strike_rate: "45.09",
	},
];

const bowlers = [
	{
		bowler: "Virat Kohli",
		overs: "76",
		maiden: "78",
		runs: "3",
		wickets: "1",
		economy: "45.09",
	},
	{
		bowler: "Virat Kohli",
		overs: "76",
		maiden: "78",
		runs: "3",
		wickets: "1",
		economy: "45.09",
	},
];

const Match = ({ params }: { params: { id: string } }) => {
	return (
		<main className="flex max-w-5xl m-auto p-5 lg:p-2 mt-5">
			<div className="space-y-5">
				<div>
					<h1 className="font-extrabold text-2xl">
						Zimbabwe vs Netherlands, 5th Match, Group A - Live Cricket Score,
						Commentary
					</h1>
					<div className="flex justify-between">
						<div className="text-sm">
							<span className="font-bold">Series: </span>
							{params.id}
						</div>
						<div className="text-sm">
							<span className="font-bold">Venue: </span>asdadsas
						</div>
						<div className="text-sm">
							<span className="font-bold">Date & Time: </span>asdadsas
						</div>
					</div>
				</div>
				<div>
					<div className="font-bold text-xl">NED 127/2 (22.2)</div>
					<div className="text-red-500 text-sm">Zimbabwe opt to bowl</div>
				</div>
				<Tabs defaultValue="commentary" className="w-full">
					<TabsList className="w-full">
						<TabsTrigger value="commentary" className="w-full">
							Commentary
						</TabsTrigger>
						<TabsTrigger value="scorecard" className="w-full">
							Scorecard
						</TabsTrigger>
					</TabsList>
					<TabsContent value="commentary" className="w-full space-y-5">
						<div className="flex flex-col space-x-2 md:flex-row">
							<Table className="rounded-lg">
								{/* <TableCaption>Batters</TableCaption> */}
								<TableHeader>
									<TableRow>
										<TableHead>Batter</TableHead>
										<TableHead className="w-[50px] text-right">R</TableHead>
										<TableHead className="w-[50px] text-right">B</TableHead>
										<TableHead className="w-[50px] text-right">4s</TableHead>
										<TableHead className="w-[50px] text-right">6s</TableHead>
										<TableHead className="w-[50px] text-right">SR</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{batters.map((batter) => (
										<TableRow key={batter.batter}>
											<TableCell>{batter.batter}</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.runs}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.balls}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.fours}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.sixes}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.strike_rate}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							<Table>
								{/* <TableCaption>Bowlers</TableCaption> */}
								<TableHeader>
									<TableRow>
										<TableHead>Bowler</TableHead>
										<TableHead className="w-[50px] text-right">O</TableHead>
										<TableHead className="w-[50px] text-right">M</TableHead>
										<TableHead className="w-[50px] text-right">R</TableHead>
										<TableHead className="w-[50px] text-right">W</TableHead>
										<TableHead className="w-[50px] text-right">ECO</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{bowlers.map((bowler) => (
										<TableRow key={bowler.bowler}>
											<TableCell>{bowler.bowler}</TableCell>
											<TableCell className="w-[50px] text-right">
												{bowler.overs}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{bowler.maiden}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{bowler.runs}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{bowler.wickets}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{bowler.economy}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
						<Separator />
						<div className="space-y-2">
							<div className="grid gap-2 lg:grid-cols-12">
								<div className="font-bold">34.5</div>
								<div className="lg:col-span-11">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Quidem sed hic ipsam est debitis corrupti, dolores veritatis
									ad voluptatum fugit neque cumque voluptas quas aliquam unde at
									laborum magnam laudantium?
								</div>
							</div>
							<div className="grid gap-2 lg:grid-cols-12">
								<div className="font-bold">34.5</div>
								<div className="lg:col-span-11">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Quidem sed hic ipsam est debitis corrupti, dolores veritatis
									ad voluptatum fugit neque cumque voluptas quas aliquam unde at
									laborum magnam laudantium?
								</div>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="scorecard" className="w-full space-y-5">
						<div className="flex flex-col space-x-2 md:flex-row">
							<Table className="rounded-lg">
								{/* <TableCaption>Batters</TableCaption> */}
								<TableHeader>
									<TableRow>
										<TableHead>Batter</TableHead>
										<TableHead className="w-[50px] text-right">R</TableHead>
										<TableHead className="w-[50px] text-right">B</TableHead>
										<TableHead className="w-[50px] text-right">4s</TableHead>
										<TableHead className="w-[50px] text-right">6s</TableHead>
										<TableHead className="w-[50px] text-right">SR</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{batters.map((batter) => (
										<TableRow key={batter.batter}>
											<TableCell>{batter.batter}</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.runs}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.balls}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.fours}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.sixes}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.strike_rate}
											</TableCell>
										</TableRow>
									))}
									{batters.map((batter) => (
										<TableRow key={batter.batter}>
											<TableCell>{batter.batter}</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.runs}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.balls}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.fours}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.sixes}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.strike_rate}
											</TableCell>
										</TableRow>
									))}
									{batters.map((batter) => (
										<TableRow key={batter.batter}>
											<TableCell>{batter.batter}</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.runs}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.balls}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.fours}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.sixes}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.strike_rate}
											</TableCell>
										</TableRow>
									))}
									{batters.map((batter) => (
										<TableRow key={batter.batter}>
											<TableCell>{batter.batter}</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.runs}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.balls}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.fours}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.sixes}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{batter.strike_rate}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							<Table>
								{/* <TableCaption>Bowlers</TableCaption> */}
								<TableHeader>
									<TableRow>
										<TableHead>Bowler</TableHead>
										<TableHead className="w-[50px] text-right">O</TableHead>
										<TableHead className="w-[50px] text-right">M</TableHead>
										<TableHead className="w-[50px] text-right">R</TableHead>
										<TableHead className="w-[50px] text-right">W</TableHead>
										<TableHead className="w-[50px] text-right">ECO</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{bowlers.map((bowler) => (
										<TableRow key={bowler.bowler}>
											<TableCell>{bowler.bowler}</TableCell>
											<TableCell className="w-[50px] text-right">
												{bowler.overs}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{bowler.maiden}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{bowler.runs}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{bowler.wickets}
											</TableCell>
											<TableCell className="w-[50px] text-right">
												{bowler.economy}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
						<Separator />
						<div className="space-y-2">
							<h1 className="text-lg font-bold">Highlights</h1>
							<div className="grid gap-2 lg:grid-cols-12">
								<div className="font-bold">34.5</div>
								<div className="lg:col-span-11">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Quidem sed hic ipsam est debitis corrupti, dolores veritatis
									ad voluptatum fugit neque cumque voluptas quas aliquam unde at
									laborum magnam laudantium?
								</div>
							</div>
							<div className="grid gap-2 lg:grid-cols-12">
								<div className="font-bold">34.5</div>
								<div className="lg:col-span-11">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Quidem sed hic ipsam est debitis corrupti, dolores veritatis
									ad voluptatum fugit neque cumque voluptas quas aliquam unde at
									laborum magnam laudantium?
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
};

export default Match;
