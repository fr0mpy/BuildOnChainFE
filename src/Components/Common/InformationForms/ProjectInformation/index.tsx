import { useCollectionDescription, useCollectionName, useCollectionSize } from "../../../../hooks/projectInformation"
import { InputSlider } from "../../../InputSlider"
import { StyledBox, StyledSpacer, StyledTextArea, StyledTextField, StyledTypography } from "./styledComponents"

export const ProjectInformation = () => {
    const [name, setName] = useCollectionName();
    const [description, setDescription] = useCollectionDescription();
    const [size, setSize] = useCollectionSize();

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);

    const handleSize = (newValue: number | Array<number> | string) => setSize(Number(newValue));

    return (
        <StyledBox>
            <StyledTypography variant="h5">
                Collection
            </StyledTypography>
            <StyledSpacer />
            <StyledTextField
                value={name}
                color="secondary"
                type="text"
                variant="outlined"
                label="Collection name"
                placeholder="Enter a name for your collection"
                onChange={handleName}
            />
            <StyledSpacer />
            <StyledTextArea
                value={description}
                color="secondary"
                type="text"
                variant="outlined"
                label="Collection Description"
                placeholder="Enter a description for your collection"
                multiline={true}
                onChange={handleDescription}
            />
            <StyledSpacer />
            <InputSlider label={"Collection Size"} max={10000} value={size} onChange={handleSize} />
            <StyledSpacer />
            <StyledSpacer />
        </StyledBox>
    )
}

