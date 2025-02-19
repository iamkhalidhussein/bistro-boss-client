import { validateCaptcha } from 'react-simple-captcha';

const useCapchaValidation = (capchaRef, setDisabled) => {
    const handleValidateCapcha = (e) => {
        e.preventDefault();
        const user_capcha_value = capchaRef.current.value;
        // console.log(user_capcha_value);
        if(validateCaptcha(user_capcha_value)) {
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    };
    return handleValidateCapcha;
};

export default useCapchaValidation;