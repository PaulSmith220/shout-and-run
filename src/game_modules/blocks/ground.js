/**
 * Created by paul on 13.03.2017.
 */
export default (size) => {
    return {
        type: "ground",
        size: size || {
            width: 1,
            height: 1
        },
        color: "#000",
    };
}