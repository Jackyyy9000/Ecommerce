import * as yup from 'yup';

export const validationSchema = [
    yup.object({
        fullName: yup.string().required("Full name is required."),
        address1: yup.string().required("Address line 1 is required."),
        address2: yup.string().optional(),
        city: yup.string().required("City is required."),
        county: yup.string().required("County is required."),
        zip: yup.string().required("Zipcode is required."),
        country: yup.string().required("Country is required."),
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required()
    })
]