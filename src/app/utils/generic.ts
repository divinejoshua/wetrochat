// Is valid url link
export function isValidURL(input : string) {
    if(!input) { return true}
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/;
    return urlPattern.test(input);
}

// Is valid youtube URL
export function isValidYouTubeURL(input : string) {
    if(!input) { return true}
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}(&[\w=?-]+)?(\?si=[\w-]+)?$/;
    return youtubePattern.test(input);
}


// Generate random text. Must be 100 characters long and contain 25 vowels.
export function generateRandomText(): string {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    let result = '';
    let vowelCount = 0;
    const targetVowels = 25;
    const targetLength = 100;

    // First add required vowels
    while (vowelCount < targetVowels) {
        result += vowels[Math.floor(Math.random() * vowels.length)];
        vowelCount++;
    }

    // Fill the rest with consonants
    while (result.length < targetLength) {
        result += consonants[Math.floor(Math.random() * consonants.length)];
    }

    // Shuffle the string
    return result.split('').sort(() => Math.random() - 0.5).join('');
}

// Verify characters in the text. Must be 100 characters long and contain 25 vowels.
export function verifyText(text: string): boolean {
    if (text.length !== 100) return false;
    
    const vowelCount = (text.match(/[aeiou]/gi) || []).length;
    return vowelCount === 25;
}