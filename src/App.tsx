import { useZoomImageHover } from "@zoom-image/react";
import { useEffect, useRef, useState } from "react";

const getMeta = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = url;
    });

function App() {
    const imageHoverContainerRef = useRef<HTMLDivElement>(null);
    const zoomTargetRef = useRef<HTMLDivElement>(null);
    const { createZoomImage: createZoomImageHover } = useZoomImageHover();
    const [aspectRatio, setAspectRatio] = useState(0);

    useEffect(() => {
        async function createZoomImage() {
            const image = await getMeta(
                "https://willnguyen1312.github.io/zoom-image/sample.avif",
            );
            const { naturalHeight, naturalWidth } = image;
            const aspectRatio = naturalWidth / naturalHeight;
            const CONTAINER_WIDTH = 200;
            const CONTAINER_HEIGHT = CONTAINER_WIDTH / aspectRatio;

            const imageContainer =
                imageHoverContainerRef.current as HTMLDivElement;

            imageContainer.style.width = `${CONTAINER_WIDTH}px`;
            imageContainer.style.height = `${CONTAINER_HEIGHT}px`;

            const zoomTarget = zoomTargetRef.current as HTMLDivElement;
            createZoomImageHover(imageContainer, {
                zoomImageSource:
                    "https://willnguyen1312.github.io/zoom-image/sample.avif",
                customZoom: { width: 300, height: 500 },
                zoomTarget,
                scale: 4,
            });

            setAspectRatio(aspectRatio);
        }

        createZoomImage();
    }, []);

    return (
        <div className="p-4 font-sans">
            <p>Hover inside the image to see zoom effect</p>
            <div
                ref={imageHoverContainerRef}
                className={`relative ${
                    aspectRatio ? "flex" : "hidden"
                } items-start`}
            >
                <img
                    className="h-full w-full"
                    alt="Small Pic"
                    src="https://willnguyen1312.github.io/zoom-image/sample.avif"
                />
                <div
                    ref={zoomTargetRef}
                    className="absolute left-[350px]"
                ></div>
            </div>
        </div>
    );
}

export default App;
