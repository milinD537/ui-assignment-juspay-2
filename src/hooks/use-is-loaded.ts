import React, { useState } from "react"

export default function useIsLoaded() {
	const [isLoaded, setIsLoaded] = useState(false)
	React.useEffect(() => {
		setIsLoaded(true)
	}, [])
	return isLoaded
}
