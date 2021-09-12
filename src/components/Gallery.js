// Module imports
import {
	useCallback,
	useState,
} from 'react'





// Local imports
import { Image } from 'components/Image'
import { Modal } from 'components/Modal'





export function Gallery(props) {
	const { images } = props
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const closeModal = useCallback(() => setModalIsOpen(false), [setModalIsOpen])

	const createPreviewClickHandler = useCallback(index => () => {
		setCurrentImageIndex(index)
		setModalIsOpen(true)
	}, [
		setCurrentImageIndex,
		setModalIsOpen,
	])

	const createClickHandler = useCallback(index => () => {
		setCurrentImageIndex(index)
	}, [setCurrentImageIndex])

	const mapButtons = useCallback(image => {
		return (
			<button
				key={image.path}
				onClick={createClickHandler}
				type="button">
				<Image
					alt={image.alt}
					height={image.height}
					key={image.path}
					src={image.path}
					width={image.width} />
			</button>
		)
	}, [])

	const mapThumbnails = useCallback((image, index, array) => {
		return (
			<button
				className="gallery-thumbnail-button"
				key={image.path}
				onClick={createPreviewClickHandler(index)}
				type="button">
				<div
					aria-label={image.alt}
					className="gallery-thumbnail"
					role="img"
					style={{
						backgroundImage: `url(${image.path})`,
					}} />
			</button>
		)
	}, [createPreviewClickHandler])

	const currentImage = images[currentImageIndex]

	return (
		<>
			<div className="gallery-preview">
				{images.map(mapThumbnails)}
			</div>

			{modalIsOpen && (
				<Modal
					onClose={closeModal}
					wrapContent={false}>
					<div className="gallery">
						<div
							aria-label={currentImage.alt}
							className="gallery-image"
							role="img"
							style={{
								backgroundImage: `url(${currentImage.path})`,
							}}>
						</div>

						<footer className="gallery-footer">
							{images.map(mapThumbnails)}
						</footer>
					</div>
				</Modal>
			)}
		</>
	)
}
