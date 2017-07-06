const createClassNameString = (...classes) =>
    classes.reduce((classArray, className) => {
        if (className) {
            return classArray.concat(className);
        }

        return classArray;
    }, [])
    .join(' ');

export default createClassNameString;
