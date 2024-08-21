"use server";

import prisma from "@/prisma/client";
import { authSignUpFormSchema } from "../utils";
import { hash } from "bcryptjs";

type FormState = {
  success: boolean;
  errors?: {
    title: string[];
  };
};

export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  companyNumber: string,
  phoneNumber: string,
  city: string,
  country: string,
  postCode: string,
  state: string,
  streetName: string,
  streetNumber: string
): Promise<FormState> {
  try {
    // console.log(formData);

    // const validData = authSignUpFormSchema().safeParse(formData);

    // if (!validData.success) {
    //   return {
    //     success: false,
    //     errors: {
    //       title: ["Invalid form data"],
    //     },
    //   };
    // }

    const pwHash = await hash(password, 12);

    await prisma.customer.create({
      data: {
        email: email,
        password: pwHash,
        firstName: firstName,
        lastName: lastName!,
        companyNumber: companyNumber,
        phoneNumber: phoneNumber!,
        address: {
          connectOrCreate: {
            where: {
              city_country_postcode_state_streetName_streetNumber: {
                city: city,
                country: country,
                postcode: postCode,
                state: state,
                streetName: streetName,
                streetNumber: streetNumber,
              },
            },
            create: {
              city: city,
              country: country,
              postcode: postCode,
              state: state,
              streetName: streetName,
              streetNumber: streetNumber,
            },
          },
        },
      },
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error("error form signUp", error);
    return {
      errors: {
        title: ["Something went wrong"],
      },
      success: false,
    };
  }
}
