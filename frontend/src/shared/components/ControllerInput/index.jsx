import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Box } from "@/shared/components";

const TextFieldErrorMessage = ({ errors, fieldName }) => {
    return (
        <Box sx={{ height: 10 }}>
            <ErrorMessage
                errors={errors}
                name={fieldName}
                render={({ message }) => (
                    <div style={{ color: "red", fontSize: 12 }}>{message}</div>
                )}
            />
        </Box>
    );
};

export const ControllerInput = ({
    fieldName,
    control,
    errors,
    children,
    required,
    rules,
    fieldNameErrorMessage,
}) => {
    return (
        <>
            <Controller
                control={control}
                name={fieldName}
                rules={
                    rules || {
                        required: {
                            value: required,
                            message: `${fieldNameErrorMessage} is required.`,
                        },
                        validate: (v) =>
                            !required ||
                            !!String(v).trim() ||
                            `${fieldNameErrorMessage} is required.`,
                    }
                }
                render={({ field }) => children(field)}
            />
            <TextFieldErrorMessage errors={errors} fieldName={fieldName} />
        </>
    );
};