import { get, post } from "../utils/Api"; 


export const fetchUserBookings = async () => {
    try {
      const authToken = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await get(`/api/bookings/self/`, config);
      return response.response;
    } catch (error) {
      throw new Error(error);
    }
};


      // <Stack
      //     direction={"column"}
      //     padding={4}
      //     borderRadius={"1rem"}
      //     boxShadow={"0px 0px 1px 1px rgba(0, 0, 0, 0.2)"}
      //   >
          
      //     <Typography fontWeight={600} fontSize="1.5rem">
      //       Payments
      //     </Typography>

          
      //     <Stack
      //       marginBlock={2}
      //       spacing={2}
      //       direction={"row"}
      //       justifyContent={"space-between"}
      //       height={"100%"}
      //       alignItems={"center"}
      //     >
      //       <Stack height={"100%"} direction={"column"}>
      //         <Typography
      //           fontFamily={"Inter"}
      //           fontWeight={400}
      //           fontSize="1rem"
      //           marginBlock={"1rem"}
      //         >
      //           Payment 1 of 2
      //         </Typography>
      //         <Typography
      //           fontFamily={"Inter"}
      //           fontWeight={500}
      //           fontSize="0.8rem"
      //           color={"#949392"}
      //         >
      //           December 19 2023 • 02:05AM EDT
      //         </Typography>
      //         <Typography
      //           fontWeight={600}
      //           fontSize="1rem"
      //           marginBlock={"0.5rem"}
      //           color={theme.palette.primary.main}
      //         >
      //           Get Receipt
      //         </Typography>
      //       </Stack>

      //       <Stack height={"100%"} direction={"column"}>
      //         <Typography>£350.00</Typography>
      //       </Stack>
      //     </Stack>

      //     <Divider />

      //     <Stack
      //       marginBlock={2}
      //       spacing={2}
      //       direction={"row"}
      //       justifyContent={"space-between"}
      //       alignItems={"center"}
      //     >
      //       <Stack height={"100%"} direction={"column"}>
      //         <Typography
      //           fontFamily={"Inter"}
      //           fontWeight={600}
      //           fontSize="1rem"
      //           marginBlock={"1rem"}
      //           height={"100%"}
      //         >
      //           Amount Paid (GBP)
      //         </Typography>
      //       </Stack>

      //       <Stack
      //         height={"100%"}
      //         alignItems={"center"}
      //         justifyContent={"center"}
      //         direction={"column"}
      //       >
      //         <Typography fontWeight={600} height={"100%"} textAlign={"center"}>
      //           £350.00
      //         </Typography>
      //       </Stack>
      //     </Stack>

      //     <Divider />

      //     <Stack
      //       marginBlock={2}
      //       spacing={2}
      //       direction={"row"}
      //       justifyContent={"space-between"}
      //       height={"100%"}
      //       alignItems={"center"}
      //     >
      //       <Stack>
      //         <Typography
      //           fontFamily={"Inter"}
      //           fontWeight={400}
      //           fontSize="1rem"
      //           marginBlock={"1rem"}
      //         >
      //           Payment 2 of 2
      //         </Typography>
      //         <Typography
      //           fontFamily={"Inter"}
      //           fontWeight={500}
      //           fontSize="0.8rem"
      //           color={"#949392"}
      //         >
      //           December 25 2023 • 12:35PM EDT
      //         </Typography>
      //         <Typography
      //           fontWeight={600}
      //           fontSize="1rem"
      //           marginBlock={"0.5rem"}
      //           color={theme.palette.primary.main}
      //           style={{
      //             cursor: "pointer",
      //           }}
      //         >
      //           Edit Payment Details
      //         </Typography>
      //       </Stack>

      //       <Typography height={"100%"} textAlign={"center"}>
      //         £187.00
      //       </Typography>
      //     </Stack>

      //     <Divider />

      //     <Stack
      //       marginTop={2}
      //       spacing={2}
      //       direction={"row"}
      //       justifyContent={"space-between"}
      //       height={"100%"}
      //       display="flex"
      //       alignItems="center"
      //     >
      //       <Stack height={"100%"} direction={"column"}>
      //         <Typography
      //           fontFamily={"Inter"}
      //           fontWeight={600}
      //           fontSize="1rem"
      //           marginBlock={"1rem"}
      //           height={"100%"}
      //         >
      //           Amount Paid (GBP)
      //         </Typography>
      //       </Stack>

      //       <Typography fontWeight={600} height={"100%"} textAlign={"center"}>
      //         £187.00
      //       </Typography>
      //     </Stack>
      //   </Stack>