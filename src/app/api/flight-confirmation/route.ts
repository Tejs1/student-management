import { NextResponse } from "next/server";

// Define the types for our request and response
type FlightConfirmationRequest = {
  ticketNo: number;
};

type FlightConfirmationResponse = {
  confirmationNo: string;
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  ticketNo: number;
  flightDetails: {
    flightNo: string;
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
  };
};

// Mock data generator function
function generateMockFlightData(ticketNo: number): FlightConfirmationResponse {
  // Array of possible first names
  const firstNames = ["James", "Emma", "Michael", "Olivia", "William", "Ava", "Alexander", "Sophia", "Daniel", "Isabella"];
  // Array of possible last names
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"];
  // Array of possible genders
  const genders = ["Male", "Female"];
  // Array of possible flight numbers
  const flightNumbers = ["AA123", "UA456", "DL789", "BA101", "LH202", "AF303", "QF404", "EK505", "SQ606", "CX707"];
  // Array of possible airports
  const airports = ["JFK", "LAX", "ORD", "LHR", "CDG", "SYD", "HKG", "DXB", "SIN", "NRT"];

  // Generate random indices for selecting mock data - ensuring they're within array bounds
  const firstNameIndex = Math.floor(Math.random() * firstNames.length);
  const lastNameIndex = Math.floor(Math.random() * lastNames.length);
  const genderIndex = Math.floor(Math.random() * genders.length);
  const flightNumberIndex = Math.floor(Math.random() * flightNumbers.length);
  const departureAirportIndex = Math.floor(Math.random() * airports.length);
  let arrivalAirportIndex = Math.floor(Math.random() * airports.length);
  
  // Ensure departure and arrival airports are different
  while (arrivalAirportIndex === departureAirportIndex) {
    arrivalAirportIndex = Math.floor(Math.random() * airports.length);
  }

  // Generate confirmation number (alphanumeric)
  const confirmationNo = `CONF${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  
  // Generate departure and arrival times (for demonstration)
  const now = new Date();
  const departureTime = new Date(now.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
  const arrivalTime = new Date(departureTime.getTime() + (2 + Math.random() * 10) * 60 * 60 * 1000);

  // Get values with safety checks (using non-null assertion operator since we know indexes are valid)
  const firstName = firstNames[firstNameIndex]!;
  const lastName = lastNames[lastNameIndex]!;
  const gender = genders[genderIndex]!;
  const flightNo = flightNumbers[flightNumberIndex]!;
  const departureAirport = airports[departureAirportIndex]!;
  const arrivalAirport = airports[arrivalAirportIndex]!;

  return {
    confirmationNo,
    userName: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    firstName,
    lastName,
    gender,
    ticketNo,
    flightDetails: {
      flightNo,
      departure: departureAirport,
      arrival: arrivalAirport,
      departureTime: departureTime.toISOString(),
      arrivalTime: arrivalTime.toISOString(),
    },
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as FlightConfirmationRequest;

    // Validate request body
    if (typeof body.ticketNo !== 'number') {
      return NextResponse.json(
        { error: "Invalid request. 'ticketNo' must be a number" },
        { status: 400 }
      );
    }
    
    const ticketNo: number = body.ticketNo;
    
    // Generate mock flight confirmation data
    const mockFlightData = generateMockFlightData(ticketNo);
    
    // Return mock data
    return NextResponse.json(mockFlightData, { status: 200 });
  } catch (error) {
    console.error("Error processing flight confirmation request:", error);
    return NextResponse.json(
      { error: "Failed to process flight confirmation" },
      { status: 500 }
    );
  }
}
