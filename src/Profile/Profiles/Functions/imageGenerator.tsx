export default function imageGenerator(userType: string, user: any) {

    // Check if user.favorite_drink exists and is not empty
    if (user.image && userType !== "guest") {
        // Return the first element of the favorite_drink array
        return `/images/profiles_pages/${user.image}`;

    } else {
        const maxNumber = 7;

        // Hash the user's email to generate a seemingly random index
        // Calculate sum of ASCII values of characters in the full name
        // Calculate the hash based on user.full_name
        const email = user.email.toLowerCase(); // Ensure consistency in character case
        let sum = 0;
        for (let i = 0; i < email.length; i++) {
            sum += email.charCodeAt(i);
        }

        // Calculate the index using modulo operation with sillyNouns length
        const index = sum % maxNumber;

        const anonymousImages = [`anonymous${index}.jpg`];
        return `/images/profiles_pages/${anonymousImages[0]}`;
    }
}
