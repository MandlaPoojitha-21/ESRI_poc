import React, { useEffect, useState } from 'react';
import type { CustomComponentProps } from 'aurora/externalContext';
import SelfRoles from './SelfRoles.query.graphql';


const Component: React.FC<CustomComponentProps> = ({ auroraContext }) => {
  const { utils } = auroraContext;
  const { useQuery } = utils;
  const { loading, data } = useQuery(SelfRoles);
  
  const [rolesData, setRolesData] = useState<any[]>([]);
  const [hasRole, setHasRole] = useState(false);

  useEffect(() => {
    if (!loading && data) {
      console.log('data in react component', data.self.roles.edges);
      setRolesData(data.self.roles.edges);
    }
  }, [loading, data]);

  useEffect(() => {
    const roleExists = rolesData.some((d) => d.node.name === 'Esri' || d.node.name === 'Administrator');
    setHasRole(roleExists);
  }, [rolesData]);

  return (
    
      
        <div>
          {hasRole && (
            <div className='custom-ArcGIS_component' style={{
              padding : '1.5625rem',
              background :  '#FFF',
              borderRadius : 5
          }}>
              <a
                style={{
                  color: '#007ac2',
                  backgroundColor: '#fff',
                  border: '1px solid #007AC2',
                  borderRadius: 0,
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '9.5px 15px',
                  fontWeight: 300,
                  display: 'block',
                  width: '100%'
                }}
                href="/category/internal-ideas"
              >
                ArcGIS Internal Ideassss
                <img
                  style={{
                    width: '30px',
                    float: 'right',
                    marginTop: '-8px'
                  }}
                  src="https://communitystg.esri.com/html/assets/ArcGIS-Internal-Ideas.png"
                  alt="ArcGIS Internal Ideas"
                />
              </a>
            </div>
          )}
        </div>
  );
};

export default Component;
