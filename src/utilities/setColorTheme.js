const isThereSettingExist = localStorage.getItem('fillogLocalSettings');

if (isThereSettingExist) {
    document.classList.add(isThereSettingExist);
}

export const checkCurrentTheme = () => {

}