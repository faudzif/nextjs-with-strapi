import { gql } from '@apollo/client';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';
import client from '../../lib/apolloClient';  // Ensure you have this configured

const GET_RIDES_AND_ATTRACTIONS = gql`
  query GetRidesAndAttractions($locale: String!, $slug: String!) {
    ridesAndAttractions(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          filter1 {
            data {
              attributes {
                slug
              }
            }
          }
          filter2 {
            data {
              attributes {
                slug
              }
            }
          }
          filter3 {
            data {
              attributes {
                slug
              }
            }
          }
          filter4 {
            data {
              attributes {
                slug
              }
            }
          }
          filter5 {
            min
            max
          }
          expressLane
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
    try {
        const lang = request.url.split("/").at(3);
        console.log('Locale:', lang);

        const rawParams = request.url.split("?")[1];
        const params: any = qs.parse(rawParams, { comma: true });

        let { rideType, thrillLevel, land, rideFeature, heightRestriction, expressLane, page, pageSize } = params;
        console.log('Parameters:', params);
        const expressLaneBool = expressLane === 'true' ? true : expressLane === 'false' ? false : undefined;

        // Ensure that the parameters are arrays
        if (rideType && !Array.isArray(rideType)) {
            rideType = [rideType];
        }
        if (thrillLevel && !Array.isArray(thrillLevel)) {
            thrillLevel = [thrillLevel];
        }
        if (land && !Array.isArray(land)) {
            land = [land];
        }
        if (rideFeature && !Array.isArray(rideFeature)) {
            rideFeature = [rideFeature];
        }

        console.log('Before GraphQL Query');
        const { data } = await client.query({
            query: GET_RIDES_AND_ATTRACTIONS,
            variables: { locale: lang, slug: 'all' },
            fetchPolicy: 'network-only',
        });
        console.log('GraphQL Data:', data);

        const ridesData = data.ridesAndAttractions.data;

        const filteredRides = ridesData.filter((ride: any) => {
            const matchRideType = rideType ? rideType.every((rt: any) => ride.attributes.filter2.data.some((type: any) => type.attributes.slug === rt)) : true;
            const matchThrillLevel = thrillLevel ? thrillLevel.every((tl: any) => ride.attributes.filter3.data.some((level: any) => level.attributes.slug === tl)) : true;
            const matchLand = land ? land.every((l: any) => ride.attributes.filter1.data.some((landItem: any) => landItem.attributes.slug === l)) : true;
            const matchRideFeature = rideFeature ? rideFeature.every((rf: any) => ride.attributes.filter4.data.some((feature: any) => feature.attributes.slug === rf)) : true;
            const matchHeightRestriction = heightRestriction ? (ride.attributes.filter5 && heightRestriction >= ride.attributes.filter5.min && heightRestriction <= ride.attributes.filter5.max) : true;
            const matchExpressLane = typeof expressLaneBool !== 'undefined' ? ride.attributes.expressLane === expressLaneBool : true;
            return matchRideType && matchThrillLevel && matchLand && matchRideFeature && matchHeightRestriction && matchExpressLane;
        });

        console.log('Filtered Rides:', filteredRides);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + parseInt(pageSize);
        const paginatedRides = filteredRides.slice(startIndex, endIndex);

        return NextResponse.json(
            {
                success: true,
                data: paginatedRides,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, score: 0 }, { status: 500 });
    }
}
