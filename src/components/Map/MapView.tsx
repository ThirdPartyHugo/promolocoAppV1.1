// Update the territory rendering to use salesman colors
useEffect(() => {
  const unsubscribe = onSnapshot(
    query(collection(db, 'territories')),
    async (snapshot) => {
      const territories: any[] = [];
      
      for (const doc of snapshot.docs) {
        const territoryData = doc.data();
        
        // Get salesman's color
        const salesmanDoc = await getDoc(doc(db, 'users', territoryData.salesmanId));
        const salesmanData = salesmanDoc.data();
        const territoryColor = salesmanData?.territoryColor || '#FF6B6B';

        territories.push({
          id: doc.id,
          ...territoryData,
          color: territoryColor
        });
      }

      setTerritories(territories);
    }
  );

  return () => unsubscribe();
}, []);

// Update the Polygon rendering
{territories.map((territory) => (
  <Polygon
    key={territory.id}
    paths={territory.coordinates}
    options={{
      fillColor: territory.color,
      fillOpacity: 0.2,
      strokeColor: territory.color,
      strokeWeight: 2,
      clickable: true,
      editable: false,
      zIndex: 1
    }}
  />
))}