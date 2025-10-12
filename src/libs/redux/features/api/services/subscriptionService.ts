import { api } from "../api";

export const subscriptionService = api.injectEndpoints({
    endpoints: (builder) => ({
        subscribeToPush: builder.mutation<void, { webPush: PushSubscription }>({
            query: ({ webPush }) => ({
                url: "/subscribe/push",
                method: "POST",
                body: { webPush }
            })
        })
    })
});

export const { useSubscribeToPushMutation } = subscriptionService;
