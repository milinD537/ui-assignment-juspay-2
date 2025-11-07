"use client"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useState } from "react"
import useIsLoaded from "@/hooks/use-is-loaded"
import { dialogData } from "@/lib/mock"
import { ChevronLeft, ChevronRight } from "lucide-react"
import dynamic from "next/dynamic"
const AtProperties = dynamic(
	() => import("../components/custom/at-properties"),
	{ ssr: false }
)
export default function Home() {
	const [activeIndex, setActiveIndex] = useState<number[]>([])
	const [prevActiveIndex, setPrevActiveIndex] = useState<number[]>([])
	const [dims, setDims] = useState<{ height?: number; width?: number }>({})
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [activeNode, setActiveNode] = useState<HTMLDivElement | null>(null)
	const loaded = useIsLoaded()
	useEffect(() => {
		console.log(activeNode, activeIndex, loaded)
		setTimeout(() => {
			const element = document.getElementById("0-node")
			if (element) {
				setDims({
					height: element.offsetHeight,
					width: element.offsetWidth,
				})
			}
		}, 100)
	}, [activeIndex, drawerOpen, loaded])
	console.log({ dims })
	useEffect(() => {
		if (!drawerOpen) {
			setTimeout(() => {
				setActiveIndex([])
				setPrevActiveIndex([])
				setDims({})
			}, 100)
		}
	}, [drawerOpen])
	console.log(activeNode)

	function updateActiveIndex(newIndex: number[]) {
		setPrevActiveIndex(activeIndex)
		setTimeout(() => setActiveIndex(newIndex), 100)
	}

	const currentList = useMemo(() => {
		let currentData = dialogData
		for (const idx of activeIndex) {
			currentData = currentData.children?.[idx] || {}
		}
		if (prevActiveIndex.length === activeIndex.length) {
			return [currentData || {}]
		}
		let prevData = dialogData
		for (const idx of prevActiveIndex) {
			prevData = prevData.children?.[idx] || {}
		}

		return [currentData || {}, prevData || {}]
	}, [activeIndex, prevActiveIndex])
	function isCurrent(index: number) {
		return index === 0
	}
	function isPast(index: number) {
		return index !== 0
	}
	function isNext(index: number) {
		if (index === 0) {
			return prevActiveIndex.length < activeIndex.length
		}
		return prevActiveIndex.length > activeIndex.length
	}
	function isPrevious(index: number) {
		if (index === 0) {
			return prevActiveIndex.length > activeIndex.length
		}
		return prevActiveIndex.length < activeIndex.length
	}

	return (
		<main className="h-dvh grid place-items-center">
			<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
				<AtProperties />
				<DrawerTrigger className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:cursor-pointer">
					Open Menu
				</DrawerTrigger>
				<DrawerContent
					className="transition-[height]! duration-200 mx-auto w-[min(512px,100%-2rem)] ~mb-12! bottom-12! ~after:bg-transparent! rounded-2xl! items-center overflow-hidden ~after:hidden!"
					style={{
						height: dims.height ? dims.height : "auto",
					}}
				>
					{currentList.map((item, index) => (
						<div
							key={index}
							className={cn(
								"absolute inset-x-0 content-center transition-discrete py-4 |",
								{
									"z-10 ~opacity-100 ~block ~visible ~translate-x-0 ~starting-hidden":
										isCurrent(index),
									"starting-x-full animate-[nextToCurrent_300ms_forwards]":
										isCurrent(index) && isNext(index),
									"-starting-x-full animate-[previousToCurrent_300ms_forwards]":
										isCurrent(index) && isPrevious(index),
									"~opacity-0 ~hidden ~invisible":
										isPast(index),
									"translate-x-full animate-[currentToNext_300ms_forwards]":
										isPast(index) && isNext(index),
									"-translate-x-full animate-[currentToPrevious_300ms_forwards]":
										isPast(index) && isPrevious(index),
								},
								prevActiveIndex
							)}
							ref={
								isCurrent(index) && drawerOpen
									? setActiveNode
									: null
							}
							id={index + "-node"}
						>
							{activeIndex.length > 0 && (
								<Button
									variant="ghost"
									onClick={() =>
										updateActiveIndex(
											activeIndex.slice(0, -1)
										)
									}
									className="px-4 hover:bg-transparent"
								>
									<ChevronLeft /> Back
								</Button>
							)}
							<div className="flex flex-col w-full">
								{item.children?.map((child, childIndex) => (
									<Button
										variant="ghost"
										key={childIndex}
										onClick={() => {
											if (!child.children) {
												setDrawerOpen(false)
												return
											}
											updateActiveIndex([
												...activeIndex,
												childIndex,
											])
										}}
										className="text-xs block text-start w-full h-auto p-0 px-4 py-2 hover:bg-transparent"
									>
										<span className="grid gap-2 grid-cols-[auto_1fr_auto] items-start font-medium">
											{child.icon}
											{child.title}
											{child.children && <ChevronRight />}
										</span>
										<span className="px-6 mt-1 wrap-break-word whitespace-normal inline-block opacity-70 text-[0.75rem] font-normal">
											{child.description}
										</span>
									</Button>
								))}
							</div>
						</div>
					))}
				</DrawerContent>
			</Drawer>
		</main>
	)
}
