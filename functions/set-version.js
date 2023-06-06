import versions from '../versions.json';




const getVersion = (inputType, outputType) => {
    const item = versions.find(
        (item) =>
            (item.input === inputType || item.image === inputType) &&
            item.output === outputType
    );
    console.log({ versions }, 'from function');
    return item ? item.version : null;
};

export default getVersion;