import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../Utils/axiosConfig";

const initialState = {
  myCollection: {},
  browseCollection: {},
  collectionById: {},
  isLoading: true,
  changed: false,
  myCollectionLoading: true,
  browseCollectionLoading: true,
};

export const getMyCollection = createAsyncThunk(
  "collection/getMyCollection",
  async ({ page, limit, sortBy, orderBy, search, lastVisible }, { rejectWithValue } ) => {
    try {
      let data = new URLSearchParams();

      data.append("page", page);
      data.append("limit", limit);
      data.append("sortBy", sortBy);
      data.append("orderBy", orderBy);
      data.append("search", search);

      if(lastVisible) {
        data.append("lastVisible", JSON.stringify(lastVisible));
      }

      const resp = await axiosConfig.post(`/api/collection/list`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return resp.data;

    } catch (err){
      return  rejectWithValue(err.response)
    }
  }
);

export const createCollection = createAsyncThunk(
  "collection/createCollection",
  async ({ title, image }, { rejectWithValue } ) => {
    const data = new FormData();

    data.append("title", title);
    data.append("image", image);

    try{
      const resp = await axiosConfig.post(`/api/collection`, data);
      return resp.data;
    } catch (err){
      return rejectWithValue(err);
    }

  }
);

export const editMyCollection = createAsyncThunk(
  "collection/editMyCollection",
  async ({ collectionid, title, image }, { rejectWithValue }) => {
    const data = new FormData();

    data.append("title", title);
    data.append("image", image);

    try{
      const resp = await axiosConfig.put(`/api/collection/${collectionid}`, data);
      return resp.data;
    } catch (err){
      return rejectWithValue(err);
    }

  }
);

export const deleteMyCollection = createAsyncThunk(
  "collection/deleteMyCollection",
  async ({ collectionid }, { rejectWithValue }) => {
        try{
          const resp = await axiosConfig.delete(`/api/collection/${collectionid}`);
          return resp.data;
        } catch (err){
          return rejectWithValue(err);
        }
  }
);

export const addNftToMyCollection = createAsyncThunk(
  "collection/addNftToMyCollection",
  async ({ collectionid, nftIds }, { rejectWithValue }) => {
    // console.log(collectionid);
    // console.log(nftIds);

    try{
      const resp = await axiosConfig.put(
        `/api/collection/nft/${collectionid}`,
        nftIds,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return resp.data;
    } catch (err){
      return rejectWithValue(err);
    }

  }
);

export const removeNftFromMyCollection = createAsyncThunk(
  "collection/removeNftFromMyCollection",
  async ({ collectionid, nftid }, { rejectWithValue }) => {
    // console.log(collectionid);

    try{
      const resp = await axiosConfig.put(
        `/api/collection/nft/${collectionid}/${nftid}`
      );

      return resp.data;
    } catch (err){
      return rejectWithValue(err);
    }

  }
);

export const browseCollections = createAsyncThunk(
  "collection/browseCollections",
  async ({ userId, page, limit, sortBy, orderBy, search, lastVisible }, { rejectWithValue }) => {
    try{
      /* const resp = await axiosConfig.get(
        `/api/collection/browse?userId=${userId}&page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&search=${search}`
      );
      return resp.data; */

      let data = new URLSearchParams();

      data.append("userId", userId);
      data.append("page", page);
      data.append("limit", limit);
      data.append("sortBy", sortBy);
      data.append("orderBy", orderBy);
      data.append("search", search);

      if(lastVisible) {
        data.append("lastVisible", JSON.stringify(lastVisible));
      }

      const resp = await axiosConfig.post(`/api/collection/browse`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return resp.data;


    } catch (err){
      return rejectWithValue(err);
    }

  }
);

export const getCollectionById = createAsyncThunk(
  "collection/getCollectionById",
  async ({ collectionid }, { rejectWithValue }) => {
    try{
      const resp = await axiosConfig.get(
        `/api/collection/browsebyid/${collectionid}`
      );

      return resp.data;
    } catch (err){
      return rejectWithValue(err);
    }

  }
);

export const likeCollection = createAsyncThunk(
  "collection/likeCollection",
  async ({ collectionid }, { rejectWithValue }) => {
    try{
      const resp = await axiosConfig.put(`/api/collection/like/${collectionid}`);
      return resp.data;
      } catch (err){
        return rejectWithValue(err);
      }

  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: {
    [getMyCollection.pending]: (state) => {
      state.isLoading = true;
      state.myCollectionLoading = true;
    },
    [getMyCollection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.changed = false;
      state.myCollectionLoading = false;
      state.myCollection = action.payload.body;
    },
    [getMyCollection.rejected]: (state, action) => {
      state.isLoading = false;
      state.myCollectionLoading = false;
    },

    [createCollection.pending]: (state) => {
      state.isLoading = true;
    },
    [createCollection.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [createCollection.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [editMyCollection.pending]: (state) => {
      state.isLoading = true;
    },
    [editMyCollection.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [editMyCollection.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addNftToMyCollection.pending]: (state) => {
      state.isLoading = true;
    },
    [addNftToMyCollection.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addNftToMyCollection.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [removeNftFromMyCollection.pending]: (state) => {
      state.isLoading = true;
    },
    [removeNftFromMyCollection.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [removeNftFromMyCollection.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [browseCollections.pending]: (state) => {
      state.isLoading = true;
      state.browseCollectionLoading = true;
    },
    [browseCollections.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.browseCollectionLoading = false;
      state.browseCollection = action.payload.body;
    },
    [browseCollections.rejected]: (state, action) => {
      state.isLoading = false;
      state.browseCollectionLoading = false;
    },

    [getCollectionById.pending]: (state) => {
      state.isLoading = true;
    },
    [getCollectionById.fulfilled]: (state, action) => {
      // console.log("REDUX SUC", action);
      state.isLoading = false;
      state.getCollectionById = action.payload.body;
    },
    [getCollectionById.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [likeCollection.pending]: (state) => {
      state.isLoading = true;
      state.changed = true;
    },
    [likeCollection.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [likeCollection.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// console.log(collectionSlice);
// export const { clearCart, removeItem, increase, decrease, calculateTotals } =
//   collectionSlice.actions;

export default collectionSlice.reducer;
