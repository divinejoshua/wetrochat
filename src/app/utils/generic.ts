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