import { getPartnerName } from '@/features/reparation/components/utils';
import { Company } from '@/services/api/company/types';
import { Reparation } from '@/services/api/reparation/types';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

type RepairReportType = {
  reparationDetails: Reparation;
  companyDetails:Company
  
};

const RepairReport = ({ reparationDetails , companyDetails  }: RepairReportType) => {
 

  const styles = StyleSheet.create({
    page: { 
      fontSize: 11, 
      paddingTop: 20, 
      paddingLeft: 40, 
      paddingRight: 40, 
      lineHeight: 1.5, 
      flexDirection: 'column' 
    },
    spaceBetween: { 
      flex: 1, 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      color: "#3E3E3E" 
    },
    titleContainer: { 
      flexDirection: 'row', 
      marginTop: 24 
    },
    logo: { 
      width: 90,
      height: 90
    },
    logoPlaceholder: {
      width: 90,
      height: 90,
      backgroundColor: '#F5F5F5',
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    reportTitle: { 
      fontSize: 16, 
      textAlign: 'center' 
    },
    addressTitle: { 
      fontSize: 11, 
      fontWeight: 'bold' 
    },
    report: { 
      fontWeight: 'bold', 
      fontSize: 20 
    },
    reportNumber: { 
      fontSize: 11, 
      fontWeight: 'bold', 
      marginTop: 8 
    },
    theader: { 
      fontSize: 10, 
      fontWeight: 'bold', 
      flex: 1, 
      height: 20, 
      paddingTop: 2, 
      paddingLeft: 7, 
      backgroundColor: '#DEDEDE', 
      borderColor: 'whitesmoke', 
      borderRightWidth: 1, 
      borderBottomWidth: 1 
    },
    theader2: { 
      flex: 2, 
      borderRightWidth: 0, 
      borderBottomWidth: 1 
    },
    tbody: { 
      fontSize: 9, 
      paddingTop: 4, 
      paddingLeft: 7, 
      flex: 1, 
      borderColor: 'whitesmoke', 
      borderRightWidth: 1, 
      borderBottomWidth: 1 
    },
    total: { 
      fontSize: 9, 
      paddingTop: 4, 
      paddingLeft: 7, 
      flex: 1.5, 
      borderColor: 'whitesmoke', 
      borderBottomWidth: 1 
    },
    tbody2: { 
      flex: 2, 
      borderRightWidth: 1 
    }
  });

  const getFormattedDate = () => {
    const date = new Date();
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  const ReportTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        {/* {companyDetails?.logoUrl && companyLogo ? (
          <Image style={styles.logo} src={companyLogo} />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Text style={{ fontSize: 8, color: '#999' }}>Logo</Text>
          </View>
        )} */}
        <Text style={styles.reportTitle}>{companyDetails?.companyName || 'Nom de l\'entreprise'}</Text>
      </View>
    </View>
  );

  const CompanyDetails = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.report}>Rapport de Réparation</Text>
          <Text style={styles.reportNumber}>Rapport N° : {reparationDetails?.callNumber || 'N/A'}</Text>
        </View>
        <View>
          <Text style={styles.addressTitle}>{companyDetails?.companyAddress || ''}</Text>
          <Text style={styles.addressTitle}>{companyDetails?.companyPhoneNumber || ''}</Text>
          <Text style={styles.addressTitle}>{companyDetails?.companyEmail || ''}</Text>
        </View>
      </View>
    </View>
  );

  const ClientDetails = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.addressTitle}>
            Client : {reparationDetails?.machine?.partner ? getPartnerName(reparationDetails.machine.partner) : 'N/A'}
          </Text>
          <Text style={styles.addressTitle}>
            Machine : {reparationDetails?.machine?.designation || 'N/A'} - {reparationDetails?.machine?.reference || 'N/A'}
          </Text>
          <Text style={styles.addressTitle}>
            Plainte du client : {reparationDetails?.customerComplaint || 'N/A'}
          </Text>
        </View>
        <View>
          <Text style={styles.addressTitle}>{getFormattedDate()}</Text>
        </View>
      </View>
    </View>
  );

  const Work = () => (
    <>
      <TableHead />
      <TableBody />
    </>
  );

  const TableHead = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 20 }}>
      <View style={styles.theader}>
        <Text>Description</Text>
      </View>
      <View style={styles.theader}>
        <Text>Prix</Text>
      </View>
    </View>
  );

  const TableBody = () => (
    <>
      {reparationDetails?.detailsList && reparationDetails.detailsList.length > 0 ? (
        reparationDetails.detailsList.map((detail, index) => (
          <View key={detail.id || index} style={{ width: '100%', flexDirection: 'row' }}>
            <View style={styles.tbody}>
              <Text>{detail.description || 'N/A'}</Text>
            </View>
            <View style={styles.tbody}>
              <Text>{detail.price ? detail.price.toFixed(2) : '0.00'} €</Text>
            </View>
          </View>
        ))
      ) : (
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={styles.tbody}>
            <Text>Aucun détail disponible</Text>
          </View>
          <View style={styles.tbody}>
            <Text>0.00 €</Text>
          </View>
        </View>
      )}
    </>
  );

  // Calculer le total
  const calculateTotal = () => {
    return reparationDetails?.detailsList?.reduce((total, detail) => total + (detail.price || 0), 0) || 0;
  };

  const TotalRow = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      <View style={[styles.tbody, { backgroundColor: '#F5F5F5', fontWeight: 'bold' }]}>
        <Text style={{ fontWeight: 'bold' }}>Total</Text>
      </View>
      <View style={[styles.tbody, { backgroundColor: '#F5F5F5', fontWeight: 'bold' }]}>
        <Text style={{ fontWeight: 'bold' }}>{calculateTotal().toFixed(2)} €</Text>
      </View>
    </View>
  );

  // Vérifier si les données sont chargées
  if (!reparationDetails || !companyDetails) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Chargement des données...</Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ReportTitle />
        <CompanyDetails />
        <ClientDetails />
        <Work />
        <TotalRow />
      </Page>
    </Document>
  );
};

export default RepairReport;