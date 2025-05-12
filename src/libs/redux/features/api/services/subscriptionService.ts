import { api } from "../api";

export const subscriptionService = api.injectEndpoints({
    endpoints: (builder) => ({
        subscribeToPush: builder.mutation<void, { subscription: PushSubscription }>({
            query: ({ subscription }) => ({
                url: "/subscribe/push",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: subscription
            })
        })
    })
});

export const { useSubscribeToPushMutation } = subscriptionService;
