export default function imageGenerator(userType: string, user: any) {

    // Check if user.favorite_drink exists and is not empty
    if (user.image && userType !== "guest") {
        // Return the first element of the favorite_drink array
        return `/images/profiles_pages/${user.image}`;

    } else {

        const minNumber = 1;
        const maxNumber = 9;

        const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        const anonymousImages = [`anonymous${randomNumber}.jpg`];
        return `/images/profiles_pages/${anonymousImages[0]}`;
    }
}
