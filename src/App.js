import Cards from "./components/Cards";
import "./styles/css/app.css";

function App() {
    const numberPool = range(12, 1);
    const imagePool = ["cake.jpg", "cats.jpg", "cocktiles.jpg", "dogs.jpg", "grill.jpg", "vacation.jpg"];
    const shuffledNumbers = shuffle(numberPool);
    const shuffledImages = shuffle(imagePool);
    const sortedImages = sortImages(shuffledImages);

    function range(size, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
    }

    function shuffle(numbers) {
        return numbers.sort(() => Math.random() - 0.5);
    }

    function findMatchedNumber(number, array) {
        return array.findIndex((element) => {
            return number + element === numberPool.length + 1;
        });
    }

    function sortImages(images) {
        let shuffledImages = [];
        let numbers = [];
        let imageCount = 0;

        shuffledNumbers.forEach((number, index) => {

            let matchedNumber = findMatchedNumber(number, numbers);

            if (matchedNumber === -1) {
                shuffledImages.push(images[imageCount]);
                imageCount++;
            } else {
                shuffledImages.push(shuffledImages[matchedNumber]);
            }

            numbers.push(number);
        });

        return shuffledImages;
    }

    return (
        <div className="page-wrapper">
            <Cards
                numbers={shuffledNumbers}
                images={sortedImages}
            />
        </div>
    );
}

export default App;
