import { useState } from "react";
import { ErrorType } from "../enums/errors";

export const useErrorMessages = () => {
    const [error, setError] = useState<ErrorType | boolean>(false);

    return [error, setError] as const;
}