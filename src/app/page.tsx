"use client"
import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useState } from "react"
import useIsLoaded from "@/hooks/use-is-loaded"
import { dialogData } from "@/lib/mock"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
	const [activeIndex, setActiveIndex] = useState<number[]>([])
	// const prevActiveIndex = useRef(activeIndex)
	const [prevActiveIndex, setPrevActiveIndex] = useState<number[]>([])
	const [dims, setDims] = useState<{ height?: number; width?: number }>({})
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [activeNode, setActiveNode] = useState<HTMLDivElement | null>(null)
	const loaded = useIsLoaded()
	// const activeRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		console.log(activeNode, activeIndex, loaded)

		if (activeNode) {
			setDims({
				height: activeNode.offsetHeight,
				width: activeNode.offsetWidth,
			})
		}
		// prevActiveIndex.current = activeIndex
	}, [activeNode])
	console.log({ dims })
	useEffect(() => {
		if (!drawerOpen) {
			setTimeout(() => {
				setActiveIndex([])
				setPrevActiveIndex([])
				setDims({})
			}, 1000)
		}
	}, [drawerOpen])
	console.log(activeNode)

	function updateActiveIndex(newIndex: number[]) {
		setPrevActiveIndex(activeIndex)
		setTimeout(() => setActiveIndex(newIndex), 500)
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
	// index === 0 -> dikhna chaiye + current
	// index === 1 -> chhupna chaiye + past
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
		<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
			<DrawerTrigger>Open</DrawerTrigger>
			<DrawerContent
				className="transition-[height]! duration-1000 mx-auto w-[min(512px,100%-2rem)] ~mb-12! bottom-12! ~after:bg-transparent! rounded-2xl! items-center overflow-hidden ~after:hidden!"
				style={{
					height: dims.height ? dims.height : "auto",
					// transition: "height 1s ease",
				}}
			>
				{currentList.map((item, index) => (
					<div
						key={index}
						className={cn(
							"absolute inset-x-0 content-center outline ~transition-[display,visibility,opacity,translate] ~duration-1000 transition-discrete |",
							{
								"z-10 ~opacity-100 ~block ~visible ~translate-x-0 ~starting-hidden":
									// index ===
									// 	activeIndex[activeIndex.length - 1] ||
									// activeIndex.length === 0,
									isCurrent(index),
								"starting-x-full animate-[nextToCurrent_1s_forwards]":
									isCurrent(index) &&
									// activeIndex[activeIndex.length - 1]
									isNext(index),
								"-starting-x-full animate-[previousToCurrent_1s_forwards]":
									isCurrent(index) &&
									// activeIndex[activeIndex.length - 1]
									isPrevious(index),
								"~opacity-0 ~hidden ~invisible": isPast(index),
								// activeIndex[activeIndex.length - 1]
								// activeIndex.length > 0
								"translate-x-full animate-[currentToNext_1s_forwards]":
									isPast(index) &&
									// prevActiveIndex[
									// 	prevActiveIndex.length - 1
									// ]
									isNext(index),
								"-translate-x-full animate-[currentToPrevious_1s_forwards]":
									isPast(index) &&
									// prevActiveIndex[
									// 	prevActiveIndex.length - 1
									// ]
									isPrevious(index),
							},
							prevActiveIndex
						)}
						ref={
							isCurrent(index) &&
							// activeIndex[activeIndex.length - 1]
							drawerOpen
								? setActiveNode
								: null
						}
					>
						{activeIndex.length > 0 && (
							<Button
								variant="ghost"
								onClick={() =>
									updateActiveIndex(activeIndex.slice(0, -1))
								}
							>
								<ChevronLeft /> Back
							</Button>
						)}
						<div className="flex flex-col gap-4 w-full">
							{item.children?.map((child, childIndex) => (
								<Button
									variant="ghost"
									key={childIndex}
									onClick={() => {
										updateActiveIndex([
											...activeIndex,
											childIndex,
										])
									}}
									className="text-xs block text-start w-full h-auto p-0"
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
	)
}
