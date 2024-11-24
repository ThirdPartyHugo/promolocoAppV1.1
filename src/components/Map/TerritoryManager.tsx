// Update the territory creation to include the salesman's color
const handleTerritoryAssign = async (salesmanId: string) => {
  if (!currentTerritory) return;

  try {
    // Get the salesman's data
    const salesmanDoc = await getDoc(doc(db, 'users', salesmanId));
    const salesmanData = salesmanDoc.data();
    const territoryColor = salesmanData?.territoryColor || '#FF6B6B';

    // Save territory with the salesman's color
    await addDoc(collection(db, 'territories'), {
      salesmanId,
      coordinates: currentTerritory.getPath().getArray().map(coord => ({
        lat: coord.lat(),
        lng: coord.lng(),
      })),
      color: territoryColor,
      createdAt: new Date(),
    });

    // Update territory appearance
    currentTerritory.setOptions({
      fillColor: territoryColor,
      fillOpacity: 0.2,
      strokeColor: territoryColor,
      strokeWeight: 2,
      editable: false
    });

    setShowAssignModal(false);
    setCurrentTerritory(null);
  } catch (error) {
    console.error('Error assigning territory:', error);
  }
};