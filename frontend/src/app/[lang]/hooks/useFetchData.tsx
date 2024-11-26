"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { useSearchParams } from "next/navigation";

const useFetchData = (
  url: any,
  initialParams: any,
  applyFilter = false,
  pageNumber: any,
  pageSize: any
) => {
  const [data, setData] = useState<any>({
    success: true,
    Pagination: {},
    data: [],
  });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const fetchData = useCallback(
    async (initialParams: any, query: any, pageNumber: any, pageSize: any) => {
      let params = { ...query, page: pageNumber, pageSize };

      // console.clear();
      // console.log(`pageNumber=${pageNumber}`)
      // console.log(`pageSize=${pageSize}`)
      // console.log('initialParams : ', initialParams)
      // console.log('query : ', query)
      // console.log('params : ', params)

      // console.log("data",data)

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
          params,
        });
        if (response.status === 200) {
          if (pageNumber > 1) {
            setData((prevState: any) => ({
              success: response.data.success,
              Pagination: response.data.Pagination,
              data: [...prevState.data, ...response.data.data],
            }));
          } else {
            setData((prevState: any) => ({
              success: response.data.success,
              Pagination: response.data.Pagination,
              data: [...response.data.data],
            }));
          }
        } else {
          throw new Error(response.statusText);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    const query: any = {};

    // console.log('searchParams',searchParams)

    searchParams.forEach((value: any, key: any) => {
      query[key] = value;
    });

    // console.log(query)
    fetchData(initialParams, query, pageNumber, pageSize);
  }, [fetchData, initialParams, applyFilter, pageNumber, pageSize]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetchData;
