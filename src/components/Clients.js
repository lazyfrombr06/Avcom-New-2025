import React from "react";
import kws from "../images/clients/dtu.png";
import geps from "../images/clients/dtte.png";
import protergia from "../images/clients/audit.png";
import dsssb from "../images/clients/dssb.png";
import ddrs from "../images/clients/ddrs.png";
import dcsd from "../images/clients/Central_Drugs_Standard_Control_Organization.png";
import mtnl from "../images/clients/mtn.png";
import djb from "../images/clients/delhi-jal-board-88066630.png";
import nct from "../images/clients/Seal_of_the_National_Capital_Territory_of_Delhi.svg.png";
import dshm from "../images/clients/Delhi-State-Health-Mission.png";
import homeGuards from "../images/clients/homeGaurds.png";
import gtbh from "../images/clients/gtbH.png";
import asgeh from "../images/clients/attar_sain_jain_eye_general_hospital.png";
import transport from "../images/clients/transport Delhi.png";

const clientImage = {
  height: "10rem",
  width: "auto",
  mixBlendMode: "colorBurn",
};

const Clients = () => {
  return (
    <div className="mt-8 bg-gray-100">
      <section data-aos="fade-up">
        <div className="my-4 py-4">
          <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">
            Our Clients
          </h2>
          <div className="flex justify-center">
            <div className="w-24 border-b-4 border-blue-900"></div>
          </div>
          <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">
            Some of our clients.
          </h2>
        </div>

        <div className="p-16" data-aos="fade-in" data-aos-delay="600">
          <div className="grid sm:grid-cols-5 lg:grid-cols-5">
            <div
              style={clientImage}
              className="overflow-hidden flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100 w-1/6"
            >
              <img src={kws} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={protergia} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={geps} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={dsssb} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={ddrs} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={dcsd} alt="client" />
            </div>
            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={mtnl} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={djb} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={nct} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={dshm} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={homeGuards} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={gtbh} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={asgeh} alt="client" />
            </div>

            <div
              style={clientImage}
              className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-70 hover:opacity-100"
            >
              <img src={transport} alt="client" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
