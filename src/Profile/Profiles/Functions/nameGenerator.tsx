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
        // Generate a random index to select a silly noun
        const randomIndex = Math.floor(Math.random() * sillyNouns.length);
        // Return "Anonymous" followed by the selected silly noun
        return `Anonymous ${sillyNouns[randomIndex]}`;
    }
}