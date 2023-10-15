import { gql } from '@apollo/client';

export const SAVE_TRACK = gql`
mutation trackCreate($track: TrackInput!) {
    trackSave(track: $track) {
        id
        subjectId
        title
        subtitle
        username
        music
        image
        likes
        n_listens
        lyrics
        album
        value
        nftIpfsCid
        nftCardanoTxId
        nftName
        nftDescription
        nftAssetName
        createdAt
        updatedAt
    }
}
`;

export const MINT_TRACK = gql`
mutation trackCreate($track: TrackInput!) {
    trackMintNft(track: $track) {
        id
        subjectId
        title
        subtitle
        username
        music
        image
        likes
        n_listens
        lyrics
        album
        value
        nftIpfsCid
        nftCardanoTxId
        nftName
        nftDescription
        nftAssetName
        createdAt
        updatedAt
    }
}
`;

export const DELETE_TRACK = gql`
mutation Delete_Track($id: ID!) {
  trackDelete(id: $id)
}
`;

export const SUBMIT_TRANSACTION = gql`
mutation Submit_Transaction($cbor: String) {
    submitTransaction(cbor: $cbor)
}
`;

export const SEND_TRANSACTION = gql`
mutation transfer ($transfer: TransferDto!) {
    transfer (transfer: $transfer)
 }
`;

export const TRANSFER_NFT = gql`
mutation Transfer ($transfer: TransferDto!) {
    transfer (transfer: $transfer)
}
`;

export const SAVE_WALLET = gql`
mutation walletCreate($wallet: WalletInput!) {
    walletSave(wallet: $wallet) {
        id
        subjectId
        name
        walletId
        address
        publicKey
        balance
        assets {
            id
            subjectId
            name
            fingerprint
            policyId
            quantity
            metadata
            assetSubjectId
            logosphereId
            createdAt
            updatedAt
        }
        createdAt
        updatedAt
    }
}
`;


export const SAVE_USER = gql`
mutation userCreate($user: UserInput!) {
    userSave(user: $user) {
        id
        subjectId
        username
        wallet {
            id
            subjectId
            name
            walletId
            address
            publicKey
            balance
            assets {
                id
                subjectId
                name
                fingerprint
                policyId
                quantity
                metadata
                assetSubjectId
                logosphereId
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
        myTracksId
        likedTracksId
        historyTracksId
        subscriptionEndDate
        rewards
        likes
        createdAt
        updatedAt
    }
}
`;

export const LIKE_TRACK = gql`
mutation trackLike($user: UserInput!) {
    userSave(user: $user) {
        id
        subjectId
        username
        wallet {
            id
            subjectId
            name
            walletId
            address
            publicKey
            balance
            assets {
                id
                subjectId
                name
                fingerprint
                policyId
                quantity
                metadata
                assetSubjectId
                logosphereId
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
        myTracksId
        likedTracksId
        historyTracksId
        subscriptionEndDate
        rewards
        likes
        createdAt
        updatedAt
    }
}
`;