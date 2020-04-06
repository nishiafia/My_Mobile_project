export const getLocation = () => {
    return new Promise(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (data) => {
                   //alert("Data =" + data.coords.latitude);
                    return resolve(data.coords)},
                (err) => {
                    alert("err =", err);
                    return reject(err)}
            );
        }
    );
}

