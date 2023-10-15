// import React, { createContext, useState, useEffect, useRef } from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_ALL_SONGS } from '../graphql/query';
// import { Track } from '../types/body.types';

// interface MusicDataContextProps {
//   children: React.ReactNode;
// }

// export const MusicDataContext = createContext<Track[]>([]);

// const MusicDataProvider: React.FC<MusicDataContextProps> = ({ children }) => {
//   const [musicData, setMusicData] = useState<Track[]>([]);
//   const componentIsMounted = useRef<boolean>(true);

//   const { loading, error, data } = useQuery(GET_ALL_SONGS);

//   useEffect(() => {
//     if (componentIsMounted.current && !loading && !error && data) {
//       const updatedMusicData = data.trackFindAll ? data.trackFindAll : [];
//       setMusicData(updatedMusicData);
//     }

//     return () => {
//       componentIsMounted.current = false;
//     };
//   }, [loading, error, data]);

//   return (
//     <MusicDataContext.Provider value={musicData}>
//       {children}
//     </MusicDataContext.Provider>
//   );
// };

// export default MusicDataProvider;
