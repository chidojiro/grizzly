import tw from 'twin.macro';

type Props = { q: string };

export const NoResults = ({ q }: Props) => {
  return (
    <div className='search-results' css={[tw`flex-col`]}>
      <h2 className='no-results-header' css={[tw`mx-auto mt-3 w-fit`]}>
        We're sorry, we couldn't find any results"
      </h2>
      <div className='zero-results-categories'>
        <h3>Shop By Category</h3>
        <ul role='menu' className='search-suggestions first' css={[tw`block`]}>
          <li>
            <ul>
              <li role='presentation'>
                <a role='menuitem' href='/abrasives' title='Abrasives &amp; Sanding'>
                  Abrasives &amp; Sanding
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/adhesives' title='Adhesives'>
                  Adhesives
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/air-accessories' title='Air Accessories'>
                  Air Accessories
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/air-compressors' title='Air Compressors'>
                  Air Compressors
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/automotive-equipment' title='Automotive Equipment'>
                  Automotive Equipment
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/woodworking-bandsaws' title='Bandsaws'>
                  Woodworking Bandsaws
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/metalworking-bandsaws' title='Bandsaws'>
                  Metalworking Bandsaws
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/books-plans-and-dvds' title='Books, Plans &amp; DVDs'>
                  Books, Plans &amp; DVDs
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/boring-machines' title='Boring Machines'>
                  Boring Machines
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/casters' title='Casters'>
                  Casters
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/clamps' title='Clamps'>
                  Clamps
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/combination-lathe-mills' title='Combination Lathe-Mills'>
                  Combination Lathe-Mills
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/contractor-home-and-shop' title='Contractor, Home &amp; Shop'>
                  Contractor, Home &amp; Shop
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/cutlery' title='Cutlery'>
                  Cutlery
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/cutting-tools' title='Cutting Tools'>
                  Cutting Tools
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/drill-presses' title='Drill Presses'>
                  Drill Presses
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/drilling-and-boring' title='Drilling &amp; Boring'>
                  Drilling &amp; Boring
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/dust-collection-accessories' title='Dust Collection Accessories'>
                  Dust Collection Accessories
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/dust-collectors' title='Dust Collectors'>
                  Dust Collectors
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/fasteners' title='Fasteners'>
                  Fasteners
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/finishing' title='Finishing'>
                  Finishing
                </a>
              </li>
            </ul>
            <ul>
              <li role='presentation'>
                <a role='menuitem' href='/gifts' title='Gifts'>
                  Gifts
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/gunsmithing-and-shooting' title='Gunsmithing &amp; Shooting'>
                  Gunsmithing &amp; Shooting
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/hand-tools' title='Hand Tools'>
                  Hand Tools
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/hardware' title='Hardware'>
                  Hardware
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/jigs-and-fixtures' title='Jigs &amp; Fixtures'>
                  Jigs &amp; Fixtures
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/jointers' title='Jointers'>
                  Jointers
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/lathes' title='Lathes'>
                  Lathes
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/luthier-supplies' title='Luthier Supplies'>
                  Luthier Supplies
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/machine-accessories' title='Machine Accessories'>
                  Machine Accessories
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/material-handling' title='Material Handling'>
                  Material Handling
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/measuring-tools' title='Measuring Tools'>
                  Measuring Tools
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/metalworking-machines-misc' title='Metalworking Machines-Misc'>
                  Metalworking Machines-Misc
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/milling-machines' title='Milling Machines'>
                  Milling Machines
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/mobile-bases-and-stands' title='Mobile Bases &amp; Stands'>
                  Mobile Bases &amp; Stands
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/motors-switches-and-electrical' title='Motors, Switches &amp; Electrical'>
                  Motors, Switches &amp; Electrical
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/nailers-and-staplers' title='Nailers &amp; Staplers'>
                  Nailers &amp; Staplers
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/parts' title='Parts'>
                  Parts
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/planers' title='Planers'>
                  Planers
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/pneumatic-tools' title='Pneumatic Tools'>
                  Pneumatic Tools
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/power-tools' title='Power Tools'>
                  Power Tools
                </a>
              </li>
            </ul>
            <ul>
              <li role='presentation'>
                <a role='menuitem' href='/presses' title='Presses'>
                  Presses
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/router-bits' title='Router Bits'>
                  Router Bits
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/safety-equipment' title='Safety Equipment'>
                  Safety Equipment
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/sandblasters' title='Sandblasters'>
                  Sandblasters
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/sanders' title='Sanders'>
                  Sanders
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/saw-blades' title='Saw Blades'>
                  Saw Blades
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/security-equipment' title='Security Equipment'>
                  Security Equipment
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/shaper-cutters' title='Shaper Cutters'>
                  Shaper Cutters
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/shapers' title='Shapers'>
                  Shapers
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/sheet-metal-machines' title='Sheet Metal Machines'>
                  Sheet Metal Machines
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/shop-accessories' title='Shop Accessories'>
                  Shop Accessories
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/south-bend-accessories' title='South Bend Accessories'>
                  South Bend Accessories
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/table-saws' title='Tablesaws'>
                  Tablesaws
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/tool-boxes' title='Tool Boxes'>
                  Tool Boxes
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/tooling' title='Tooling'>
                  Tooling
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/vises' title='Vises'>
                  Vises
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/welding-accessories' title='Welding &amp; Cutting'>
                  Welding Accessories
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/wheels' title='Wheels'>
                  Wheels
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/wood-products' title='Wood products'>
                  Wood products
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/woodworking-machines-misc' title='Woodworking Machines- Misc'>
                  Woodworking Machines- Misc
                </a>
              </li>
              <li role='presentation'>
                <a role='menuitem' href='/workbenches' title='Workbenches'>
                  Workbenches
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
