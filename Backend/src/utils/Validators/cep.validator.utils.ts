import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint()
export class IsValidCEP implements ValidatorConstraintInterface {
    public async validate(cep: string, args: ValidationArguments) {

        const IsValid = cep.length === 8;
        return IsValid
    }

    defaultMessage(args: ValidationArguments) {
        return 'cep $value is not valid';
    }
}