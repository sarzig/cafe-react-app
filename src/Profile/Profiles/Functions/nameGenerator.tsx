export default function nameGenerator(userType: string, user: any) {

    if (userType !== "guest") {
        // If user isn't guest, then just show real names
        return user.full_name;
    }

    else if (user.favorite_drinks && user.favorite_drinks.length > 0) {
        // If user is guest, then show anonymous name based on favorite drink
        return "Anonymous " + user.favorite_drinks[0] + " Drinker";


    } else {
        // If there are no favorite drinks, generate a silly noun
        const sillyNouns = ["Cafe Goer", "Awesome Friend", "Serious Goofball", "Hipster Wannabe", "Introvert", "Extrovert", "Public Universal Friend"]

        // Hash the user's email to generate a seemingly random index
        // Calculate sum of ASCII values of characters in the full name
        // Calculate the hash based on user.full_name
        const email = user.email.toLowerCase(); // Ensure consistency in character case
        let sum = 0;
        for (let i = 0; i < email.length; i++) {
            sum += email.charCodeAt(i);
        }

        // Calculate the index using modulo operation with sillyNouns length
        const index = sum % sillyNouns.length;

        // Return "Anonymous" followed by the selected silly noun
        return `Anonymous ${sillyNouns[index]}`;
    }
}