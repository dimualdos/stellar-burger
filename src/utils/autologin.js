export const chekAutoLogin = (dispatch) => {
    const tokenDetail = localStorage.getItem("refreshToken");

    if (!tokenDetail) {
        dispatch(logout());
        return;
    }
    let token = '';
    token = JSON.parse(tokenDetail);

}