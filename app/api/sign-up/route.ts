import { cookieOptions, NileJWTPayload } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import jwtDecode from "jwt-decode";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Note that this route must exist in this exact location for user/password signup to work
// Nile's SignUp component posts to this route, we call Nile's signup API via the SDK
// export async function POST(req: Request) {
//   const res = await nile.api.auth.signUp(req);
//   const abc = await res.json();
//   console.log(abc, "ABC");

//   if (res && res.status >= 200 && res.status < 300) {
//     const body = await res.json();
//     const accessToken = body.token.jwt;
//     const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
//     const cookieData = {
//       accessToken: accessToken,
//       tokenData: decodedJWT,
//     };
//     cookies().set("authData", JSON.stringify(cookieData), cookieOptions(3600));
//     revalidatePath("/");
//     return new Response(JSON.stringify(body), { status: 201 });
//   } else {

//     const body = await res.text();
//     console.log("got error response: " + body + " " + res.status);
//     return new Response(body, { status: res.status });
//   }
// }

export async function POST(req: Request) {
  try {
    const res = await nile.api.auth.signUp(req);
    const body = await res.json(); // Call res.json() only once
    console.log(body, "BODY");

    if (res && res.status >= 200 && res.status < 300) {
      const accessToken = body.token.jwt;
      const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
      const cookieData = {
        accessToken: accessToken,
        tokenData: decodedJWT,
      };
      cookies().set(
        "authData",
        JSON.stringify(cookieData),
        cookieOptions(3600)
      );
      revalidatePath("/");
      return new Response(JSON.stringify(body), { status: 201 });
    } else {
      const errorBody = await res.text();
      console.log("got error response: " + errorBody + " " + res.status);
      return new Response(errorBody, { status: res.status });
    }
  } catch (error) {
    console.error(error);
    return new Response("An error occurred during sign up", { status: 500 });
  }
}

