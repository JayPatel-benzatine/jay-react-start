import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";

export const nftBrowseSlice = createApi({
    reducerPath: "nftBrowseSlice",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getTrendingNfts: builder.query({
            async queryFn({ sortBy, search, mode, categoryid}) {
                try {
                    const userRef = collection(db, "nfts");
                    const q = query(userRef, where("formOfSale", "==", mode));
                    const categories = query(userRef, where("nftCategory", "==", categoryid));
                    const date = query(userRef, orderBy('createdAt', 'desc'), limit(10));
                    const price = query(userRef,  orderBy('fixedPrice', 'desc'), limit(10));
                    const popular = query(userRef,  orderBy('totalliked', 'desc'), limit(10));
                    const s = query(userRef,  where('title', '>=', search), where('title', '<=', search + '\uf8ff'));

                    const querySnapshot = await getDocs(categoryid !== 'all' ? categories :(search === '' ? (sortBy === 'DATE' ? date : (sortBy === 'POPULARITY' ? popular : (sortBy === 'PRICE' ? price :q))) : s));
                    let collectionData = [];
                    querySnapshot?.forEach((doc) => {
                        collectionData.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    return { data: collectionData };
                } catch (err) {
                    console.log("err", err);
                    return { error: err };
                }
            },

        }),
        getnftLikes: builder.query({
            async queryFn() {
                try {
                    const querySnapshot = await getDocs(collection(db, "nftlikes"));
                    let collectionData = [];
                    querySnapshot?.forEach((doc) => {
                        collectionData.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    return { data: collectionData };
                } catch (err) {
                    console.log("err", err);
                    return { error: err };
                }
            },
        }),

        createnftlikes: builder.mutation({
            async queryFn(data) {
                try {
                    await setDoc(doc(db, "nftlikes", data?.nftId), {
                        ...data,
                        createdAt: serverTimestamp(),
                    });
                    return { data: null };
                } catch (err) {
                    return { error: err ? err : null };
                }
            },
        }),

        updatenftlikes: builder.mutation({
            async queryFn(data) {
                try {
                    const Ref = doc(db, "nfts", data?.collectionId);

                    await updateDoc(Ref, {
                        totalliked: data.tl
                    });

                    return { data: null };
                } catch (err) {
                    return { error: err ? err : null };
                }
            },
        }),
        updatenftliked: builder.mutation({
            async queryFn(data) {
                try {
                    const Ref = doc(db, "nftlikes", data?.collectionId);

                    await updateDoc(Ref, {
                        liked: data.status
                    });


                    return { data: null };
                } catch (err) {
                    return { error: err ? err : null };
                }
            },
        }),
    }),
})

export const {
    useGetTrendingNftsQuery,
    useGetnftLikesQuery,
    useCreatenftlikesMutation,
    useUpdatenftlikedMutation,
    useUpdatenftlikesMutation

} = nftBrowseSlice;